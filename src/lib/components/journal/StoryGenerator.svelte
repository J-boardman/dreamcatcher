<script lang="ts">
	import { page } from '$app/stores';
	import { chapterStoryPrompt, fullStoryPrompt } from '$lib/prompts/prompts';
	import { dreamJournals, currentStory, state } from '$lib/stores';

	export let isLoading;
	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;
	export let messages;

    let conversationID = $page.url.searchParams.get("conversation")?.toString()

	function handleStoryGeneration() {
		if ($currentStory.type == 'pee') tester();
		else if ($currentStory.type == 'fullStory') generateFullStory();
		else startChapterStory();

		currentStory.update((prev) => ({ ...prev, chapterIndexStart: $messages.length - 1 }));
	}

	async function startChapterStory() {
		const prompt = chapterStoryPrompt($currentStory.mood, $currentStory.setting);
		await appendSystemMessage(prompt, 'Choose your own adventure story');
		state.set('GENERATING_CHAPTER_STORY');
	}

	async function generateFullStory() {
		const prompt = fullStoryPrompt($currentStory.mood, $currentStory.setting);
		const response = await appendSystemMessage(prompt, 'Your story');

		if (response) {
            $currentStory.story = response;
            const found = $dreamJournals.find(item => item.id == conversationID)
            if(found){
                found.story = response;
                // localStorage.setItem("conversations", JSON.parse())
            }
        }

		state.set('STORY_GENERATION_FINISHED');
	}

	async function tester() {
		await appendSystemMessage('Respond with 1', 'hidden message');
        state.set('STORY_GENERATION_FINISHED');
	}
</script>

{#if $state == "CONVERSATION_OVER"}
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
		<option value="pee">1</option>
	</select>
	<button disabled={$isLoading} on:click={handleStoryGeneration} class="btn btn-secondary">
		Start the adventure!
	</button>
</section>
{/if}