<script lang="ts">
	import { currentStory, state } from '$lib/stores';
	import type { Message } from 'ai/svelte/dist';
	import type { Readable } from 'svelte/store';

	export let isLoading;
	export let messages: Readable<Message[]>;
	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;

	let customInstruction = '';

	async function finaliseChapterStory() {
		let chapters = $messages.filter(
			(message, i) => message.role == 'assistant' && i > $currentStory.chapterIndexStart
		);
		const choicesRemoved = chapters.map((chapter) => {
			return chapter.content.split('Choose your path:')[0];
		});

		const fullStory = choicesRemoved.join('\n').replaceAll('\n\n', '\n');

		console.table(fullStory);
		currentStory.update(prev=> ({...prev, story: fullStory}));
		 state.set('STORY_GENERATION_FINISHED');
	}

	async function handleOptionClick(e: MouseEvent) {
		const target = e.target as HTMLButtonElement;
		await appendSystemMessage(target.value, 'hidden message');

		if (target.value == 'Wrap it up') finaliseChapterStory();
	}

	async function handleCustomInstruction(e: SubmitEvent) {
		await appendSystemMessage(customInstruction, 'hidden message');
	}
</script>

{#if $state == "GENERATING_CHAPTER_STORY"}
<section class="mt-2 flex flex-col lg:flex-row gap-4">
	<div class="join flex">
		<button
			on:click={handleOptionClick}
			value="option 1"
			disabled={$isLoading}
			class="btn join-item flex-1"
		>
			Option 1
		</button>
		<button
			on:click={handleOptionClick}
			value="option 2"
			disabled={$isLoading}
			class="btn join-item flex-1"
		>
			Option 2
		</button>
		<button
			on:click={handleOptionClick}
			value="option 3"
			disabled={$isLoading}
			class="btn join-item flex-1"
		>
			Option 3
		</button>
	</div>
	<button on:click={handleOptionClick} value="Wrap it up" disabled={$isLoading} class="btn">
		Wrap it up!
	</button>
	<form on:submit={handleCustomInstruction} class="join flex flex-1">
		<input
			bind:value={customInstruction}
			type="text"
			class="input join-item flex-1"
			placeholder="Custom instruction"
			disabled={$isLoading}
		/>
		<button disabled={$isLoading} class="btn join-item">Send</button>
	</form>
</section>
{/if}