<script lang="ts">
	import { chapterStoryPrompt, fullStoryPrompt } from '$lib/prompts/prompts';
	import { currentStory } from '$lib/stores';

	export let isLoading;
	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;
	export let messages;
	export let currentState;

	function handleStoryGeneration() {
		if ($currentStory.type == 'fullStory') generateFullStory();
		else {
			currentStory.update((prev) => ({ ...prev, chapterIndexStart: $messages.length - 1 }));
			startChapterStory();
		}
	}

	function startChapterStory() {
		currentState = 'GENERATING_CHAPTER_STORY';
		const prompt = chapterStoryPrompt($currentStory.mood, $currentStory.setting);
		console.log(prompt);
		appendSystemMessage(prompt, 'Choose your own adventure story');
	}

	async function generateFullStory() {
		const prompt = fullStoryPrompt($currentStory.mood, $currentStory.setting);
		const response = await appendSystemMessage(prompt, 'Your story');

		if (response) $currentStory.story = response;
		currentState = 'STORY_GENERATION_FINISHED';
	}
</script>

<div class="divider"><span class="opacity-50 uppercase">Story generator</span></div>
<section class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 h-min">
	<input
		type="text"
		placeholder="Story Mood"
		list="moods"
		class="input"
		name="mood"
		bind:value={$currentStory.mood}
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
		bind:value={$currentStory.setting}
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
	<select bind:value={$currentStory.type} class="select" name="type">
		<option disabled selected>Story Type</option>
		<option value="fullStory">Full story</option>
		<option value="chapterStory">Choose your own adventure</option>
	</select>
	<button disabled={$isLoading} on:click={handleStoryGeneration} class="btn btn-secondary">
		Start the adventure!
	</button>
</section>
