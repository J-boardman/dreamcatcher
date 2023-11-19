<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Journal, journal } from '$lib/Journals';
	import { chapterStoryPrompt, fullStoryPrompt } from '$lib/prompts/prompts';
	import { state } from '$lib/stores';

	export let isLoading;
	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;
	export let messages;

    $: story = $journal?.story

	function handleStoryGeneration() {
		if ($journal?.story?.type == 'fullStory') generateFullStory();
		else startChapterStory();
        Journal.updateStory({ chapterIndexStart: $messages.length - 1}, true)
	}

	async function startChapterStory() {
		const prompt = chapterStoryPrompt($journal?.story?.mood, $journal?.story?.setting);
		await appendSystemMessage(prompt, 'choose your own adventure story');
        Journal.updateState("GENERATING_CHAPTER_STORY", true)
	}

	async function generateFullStory() {
		const prompt = fullStoryPrompt(story?.mood, story?.setting);
		const response = await appendSystemMessage(prompt, 'Your story');

		if(!response) return;
        
        Journal.updateStory({ story: response}, true)
        Journal.updateState("STORY_GENERATION_FINISHED", true)
	}
</script>

{#if $state == "CONVERSATION_OVER"}
<div class="divider"><span class="opacity-50 uppercase">Story generator</span></div>
<section class="grid grid-cols-2 md:grid-cols-4 gap-4 h-min">
	<input
		type="text"
		placeholder="Story Mood"
		list="moods"
		class="input"
		name="mood"
		bind:value={story.mood}
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
		placeholder="Story Setting"
		list="settings"
		class="input"
		name="setting"
		bind:value={story.setting}
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
	<select bind:value={story.type} class="select" name="type">
		<option disabled selected>Story Type</option>
		<option value="fullStory">Full story</option>
		<option value="chapterStory">Choose your own adventure</option>
	</select>
	<button disabled={$isLoading || !story.type} on:click={handleStoryGeneration} class="btn btn-secondary">
		Start the adventure!
	</button>
</section>
{/if}