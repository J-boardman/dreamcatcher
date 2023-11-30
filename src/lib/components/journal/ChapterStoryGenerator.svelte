<script lang="ts">
	import { Journal, getChatContext } from '$lib';
	import { systemMessage } from '$lib/helpers/appendSystemMessage';
	import { journal, state } from '$lib/stores';

	const { isLoading, messages, append } = getChatContext();

	let customInstruction = '';

	async function finaliseChapterStory() {
		let chapters = $messages.filter(
			(message, i) => message.role == 'assistant' && i > $journal.story.chapterIndexStart
		);

		const choicesRemoved = chapters.map((chapter) => {
			return chapter.content.split('Choose your path:')[0];
		});

		const fullStory = choicesRemoved.join('\n').replaceAll('\n\n', '\n');

		Journal.updateStory({ story: fullStory });
		Journal.update({ lastState: 'FINALISING_STORY' });
		state.set('FINALISING_STORY');
	}

	async function handleOptionClick(e: MouseEvent) {
		const { value } = e.target as HTMLButtonElement;
		await append(systemMessage(value, 'hidden message'));
		if (value == 'Wrap it up') finaliseChapterStory();        
	}

	async function handleCustomInstruction(e: SubmitEvent) {
		await append(systemMessage(customInstruction, 'hidden message'));
		customInstruction = '';
	}
</script>

{#if $state == 'GENERATING_CHAPTER_STORY'}
	<section class="mt-2 flex flex-col lg:flex-row gap-4">
		<div class="join flex">
			{#each Array(3) as _, i}
				<button
                    on:click={handleOptionClick}
                    value="option {i + 1}"
                    disabled={$isLoading}
                    class="btn join-item flex-1 animate-none"
                >        
					Option {i + 1}
				</button>
			{/each}
		</div>
		<button
			on:click={handleOptionClick}
			value="Wrap it up"
			disabled={$isLoading}
			class="btn animate-none"
		>
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
			<button disabled={$isLoading} class="btn join-item animate-none">Send</button>
		</form>
	</section>
{/if}
