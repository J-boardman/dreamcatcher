<script lang="ts">
	import { getChatContext } from '$lib';
	import { updateJournal } from '$lib/helpers/journal';
	import { chapterStoryPrompt, fullStoryPrompt } from '$lib/helpers/prompts';
	import { systemMessage } from '$lib/helpers/systemMessage';

	import { journal, state } from '$lib/stores';
	const { messages, isLoading, append } = getChatContext();

	function handleStoryGeneration() {
		if ($journal?.story?.type == 'fullStory') generateFullStory();
		else startChapterStory();
		updateJournal({ story: { ...$journal.story, chapterIndexStart: $messages.length - 1 } });
	}

	async function startChapterStory() {
		const prompt = chapterStoryPrompt($journal?.story?.mood, $journal?.story?.setting);
		await append(systemMessage(prompt, 'choose your own adventure story'));
		updateJournal({ lastState: 'GENERATING_CHAPTER_STORY' });
		state.set('GENERATING_CHAPTER_STORY');
	}

	async function generateFullStory() {
        const prompt = fullStoryPrompt($journal.story?.mood, $journal.story?.setting);
		await append(systemMessage(prompt, 'Your story'));
		const response = $messages.at(-1);
        
		if (!response) return;

		updateJournal({
			story: { ...$journal.story, story: response.content },
			lastState: 'FINALISING_STORY'
		});
        
        state.set('FINALISING_STORY');
	}

	function changeStoryType(e: MouseEvent) {
		const target = e.target as HTMLButtonElement;
		updateJournal({ story: { ...$journal.story, type: target.value } });
	}
</script>

<section class="flex flex-1 gap-2">
	<button
		class:btn-secondary={$journal.story.type == 'fullStory'}
		on:click={changeStoryType}
		value="fullStory"
		class="btn flex-1 no-animation"
		disabled={$isLoading}
	>
		Full Story
	</button>
	<button
		class:btn-secondary={$journal.story.type == 'chapterStory'}
		on:click={changeStoryType}
		value="chapterStory"
		class="btn flex-1 no-animation"
		disabled={$isLoading}
	>
		Choose your own adventure
	</button>
	<button
		disabled={!$journal.story.type || $isLoading}
		class="btn flex-1 no-animation"
		on:click={handleStoryGeneration}
	>
		Start!
	</button>
</section>
