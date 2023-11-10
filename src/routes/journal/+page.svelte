<script lang="ts">
	import { pageTitle } from '$lib/stores';
	import { useChat } from 'ai/svelte';
	import { onMount } from 'svelte';
	import Chatbox from '$lib/components/ChatBox.svelte';
	import { dreamInterpretatorPrompt } from '$lib/prompts/prompts';

	type State =
		| 'INTERPRETING'
		| 'CONVERSATION_OVER'
		| 'GENERATING_FULL_STORY'
		| 'GENERATING_CHAPTER_STORY'
		| 'STORY_GENERATION_FINISHED';

	let currentState: State = 'GENERATING_CHAPTER_STORY';

	const { input, handleSubmit, messages, isLoading, append } = useChat({
		initialMessages: [
			{
				role: 'assistant',
				content: dreamInterpretatorPrompt,
				id: '001'
			}
		]
	});
	onMount(() => pageTitle.set('Dream Journal'));

	function handleConversationFinished() {
		append({
			role: 'system',
			id: 'xx',
			content:
				'Please create one final dream interpretation based on the dream with the added context of the conversation so far.',
			name: 'Final Interpretation'
		});
		currentState = 'CONVERSATION_OVER';
	}

	function handleStoryGeneration() {
		console.table(storyDetails);
		append({
			role: 'system',
			id: 'yy',
			content:
				storyDetails.type == 'fullStory'
					? `Please create a long, ${storyDetails.mood}, fantastical bedtime story set in a ${storyDetails.setting} setting based on your previous dream interpretation. Do not include a title as this will be generated later.`
					: '',
			name: 'generate-story'
		});

		currentState =
			storyDetails.type == 'fullStory' ? 'STORY_GENERATION_FINISHED' : 'GENERATING_CHAPTER_STORY';
	}

    function handleClick(){
        console.log("clicked")
    }

	let storyDetails = {
		mood: '',
		setting: '',
		type: ''
	};

	function saveStory() {
		console.log('saved');
	}

	let credits = 5;
</script>

<main class="m-2 mx-4 h-[calc(100svh-1rem)] md:h-[calc(100svh-6rem)] flex flex-col">
	<Chatbox {messages} />
	{#if currentState == 'INTERPRETING'}
		<form on:submit={handleSubmit} class="form-control gap-2 m-2 w-full mx-auto">
			<textarea bind:value={$input} class="textarea textarea-sm" placeholder="" />
			<div class="gap-4 mt-1 grid sm:grid-cols-2 md:grid-cols-3">
				<button disabled={$isLoading} class="btn">Send</button>
				{#if $messages.length > 2}
					<button
						disabled={$isLoading || credits == 0}
						class="btn btn-secondary"
						on:click={handleConversationFinished}>Start your story (1 credit)</button
					>

					<article class="flex flex-col justify-center gap-2">
						<small>Credits remaining: {credits}</small>
						<progress class="progress progress-secondary w-56" value={credits} max="10" />
					</article>
				{/if}
			</div>
		</form>
	{:else if currentState == 'CONVERSATION_OVER'}
		<div class="divider"><span class="opacity-50 uppercase">Story generator</span></div>
		<section class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 h-min">
			<input
				type="text"
				placeholder="Story Mood"
				list="moods"
				class="input"
				name="mood"
				bind:value={storyDetails.mood}
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
				bind:value={storyDetails.setting}
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
				<option value="">Vast desert</option>
				<option value="">Dense Jungle</option>
			</datalist>
			<select bind:value={storyDetails.type} class="select" name="type">
				<option disabled selected>Story Type</option>
				<option value="fullStory">Full story</option>
				<option value="chapterStory">Choose your own adventure</option>
			</select>
			<button disabled={$isLoading} on:click={handleStoryGeneration} class="btn btn-secondary"
				>Start the adventure!</button
			>
		</section>
	{:else if currentState == 'STORY_GENERATION_FINISHED'}
		<form on:submit={handleSubmit} class="join w-full flex mt-2">
			<input
				type="text"
				bind:value={$input}
				class="input join-item flex-1"
				placeholder="Request any adjustments you'd like here"
			/>
			<button class="btn join-item" disabled={$isLoading}>Send</button>
			<button class="btn join-item btn-secondary" disabled={$isLoading} on:click={saveStory}
				>Save Story</button
			>
		</form>
	{:else if currentState == 'GENERATING_CHAPTER_STORY'}
		<form on:submit={handleClick} class="mt-2 flex gap-4">
			<div class="join flex-1">
				<button disabled={$isLoading} class="btn join-item">Option 1</button>
				<button disabled={$isLoading} class="btn join-item">Option 2</button>
				<button disabled={$isLoading} class="btn join-item">Option 3</button>
			</div>
            <button disabled={$isLoading} class="btn">Wrap it up!</button>
		</form>
	{/if}
</main>
