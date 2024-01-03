<script lang="ts">
	import { getChatContext } from '$lib';
	import { updateJournal } from '$lib/helpers/journal';
	import { systemMessage } from '$lib/helpers/systemMessage';
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

		updateJournal({
			story: { ...$journal.story, story: fullStory },
			lastState: 'FINALISING_STORY'
		});
		state.set('FINALISING_STORY');
	}

	async function handleOptionClick(e: MouseEvent) {
		const { value } = e.target as HTMLButtonElement;
		await append(systemMessage(value, 'hidden message'));
		if (value == 'Wrap it up') finaliseChapterStory();
	}

	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

{#if $state == 'GENERATING_CHAPTER_STORY'}
	<section class="flex gap-2">
		{#each Array(3) as _, i}
			<button
				on:click={handleOptionClick}
				value="option {i + 1}"
				disabled={$isLoading}
				class="btn animate-none"
			>
				{#if innerWidth >= 768}
					Option
				{/if}
				{i + 1}
			</button>
		{/each}

		<button
			on:click={handleOptionClick}
			value="Wrap it up"
			disabled={$isLoading}
			class="btn animate-none"
		>
			Wrap it up!
		</button>
	</section>
{/if}
