<script lang="ts">
	import { Journal } from '$lib';
	import { systemMessage } from '$lib/helpers/appendSystemMessage';
	import { getChatContext } from '$lib/helpers/getChatContext';
	import { chapterStoryPrompt, fullStoryPrompt } from '$lib/prompts/prompts';
	import { journal, state } from '$lib/stores';

    const { append, messages, isLoading } = getChatContext()

	function handleStoryGeneration() {
		if ($journal?.story?.type == 'fullStory') generateFullStory();
		else startChapterStory();
        Journal.updateStory({ chapterIndexStart: $messages.length - 1})
	}

	async function startChapterStory() {
		const prompt = chapterStoryPrompt($journal?.story?.mood, $journal?.story?.setting);
		await append(systemMessage(prompt, 'choose your own adventure story'));
        Journal.update({ lastState: "GENERATING_CHAPTER_STORY"})
        state.set("GENERATING_CHAPTER_STORY")
	}

	async function generateFullStory() {
		const prompt = fullStoryPrompt($journal.story?.mood, $journal.story?.setting);
		await append(systemMessage(prompt, 'Your story'));
        const response = $messages.at(-1);

		if(!response) return;
        
        Journal.updateStory({ story: response.content})
        Journal.update({ lastState: "FINALISING_STORY"})
        state.set("FINALISING_STORY")
	}
</script>

{#if $state == "CONVERSATION_OVER"}
<section class="grid grid-cols-4 gap-4 py-4 md:pb-1 h-min">
	<input
		type="text"
		placeholder="Mood"
		list="moods"
		class="input col-span-2 md:col-span-1"
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
		placeholder="Setting"
		list="settings"
		class="input col-span-2 md:col-span-1"
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
	<select bind:value={$journal.story.type} class="select col-span-2 md:col-span-1" name="type" placeholder="Story Type" disabled={$isLoading}>
		<option disabled selected>Story Type</option>
		<option value="fullStory">Full story</option>
		<option value="chapterStory">Choose your own adventure</option>
	</select>
	<button disabled={$isLoading || !$journal.story.type} on:click={handleStoryGeneration} class="btn btn-secondary animate-none">
		Start!
	</button>
</section>
{/if}