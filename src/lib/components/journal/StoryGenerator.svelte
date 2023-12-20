<script lang="ts">
	import { getChatContext, systemMessage, updateJournal } from '$lib';
	import { chapterStoryPrompt, fullStoryPrompt } from '$lib/helpers/prompts';
	import { journal, state } from '$lib/stores';

	const { append, messages, isLoading } = getChatContext();

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
            story: {...$journal.story, story: response.content},
            lastState: "FINALISING_STORY"
        })
		state.set('FINALISING_STORY');
	}
</script>

{#if $state == 'CONVERSATION_OVER'}
	<section class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 py-2 h-min">
        <input
        type="text"
        placeholder="Mood (Optional)"
        list="moods"
        class="input"
        name="mood"
        bind:value={$journal.story.mood}
        disabled={$isLoading}
		/>
		<datalist id="moods">
            <option>Wholesome</option>
			<option>Scary</option>
			<option>Funny</option>
			<option>Sad</option>
			<option>Mysterious</option>
			<option>Fantastical</option>
			<option>Romantic</option>
			<option>Gloomy</option>
		</datalist>
		<input
			type="text"
			placeholder="Setting (Optional)"
			list="settings"
			class="input"
			name="setting"
			bind:value={$journal.story.setting}
			disabled={$isLoading}
		/>
		<datalist id="settings">
            <option>Medieval</option>
			<option>Futuristic</option>
			<option>Fantasy</option>
			<option>Historical</option>
			<option>Post Apocalypse</option>
			<option>Magical Realm</option>
			<option>Mysterious Location</option>
			<option>Outer Space</option>
			<option>Secluded Island</option>
			<option>Vast desert</option>
			<option>Dense Jungle</option>
		</datalist>
        <select
            bind:value={$journal.story.type}
            class="select"
            name="type"
            placeholder="Story Type"
            disabled={$isLoading}
        >
            <option value="Story Type" hidden disabled selected>Story Type</option>
            <option value="fullStory">Full story</option>
            <option value="chapterStory">Choose your own adventure</option>
        </select>
		<button
        disabled={$isLoading || !$journal.story.type}
        on:click={handleStoryGeneration}
        class="btn btn-secondary animate-none w-2/4 md:w-full"
		>
        Start!
    </button>
	</section>
{/if}
