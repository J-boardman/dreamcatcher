<script lang="ts">
	import { pageTitle } from '$lib/stores';
	import { useChat } from 'ai/svelte';
	import { afterUpdate, onMount } from 'svelte';
	import Chatbox from '$lib/components/ChatBox.svelte';
	import { dreamInterpretatorPrompt, storyTemplate } from '$lib/prompts/prompts';
	import cover from '$lib/assets/nice.png';

	let story = storyTemplate;
	// let story = '';
	let chapterIndexStart = 0;
	type State =
		| 'INTERPRETING'
		| 'CONVERSATION_OVER'
		| 'GENERATING_CHAPTER_STORY'
		| 'STORY_GENERATION_FINISHED'
		| 'FINALISING_STORY'
		| 'GENERATING_IMAGE';

	let currentState: State = 'FINALISING_STORY';
	onMount(() => pageTitle.set('Dream Journal'));
	$: pageTitle.set(title);

	const { input, handleSubmit, messages, isLoading, append } = useChat({
		initialMessages: [
			{
				role: 'assistant',
				content: dreamInterpretatorPrompt,
				id: '001'
			}
		]
	});

	async function appendSystemMessage(content: string, name: string) {
		await append({
			role: 'system',
			id: Math.random().toString(36).substring(2, 9),
			content,
			name
		});

		return $messages.at(-1)?.content;
	}

	function handleConversationFinished() {
		if ($messages.length > 3) {
			appendSystemMessage(
				'Please create one final dream interpretation based on the dream with the added context of the conversation so far.',
				'Final Interpretation'
			);
		}
		currentState = 'CONVERSATION_OVER';
	}

	function handleStoryGeneration() {
		if (storyDetails.type == 'fullStory') generateFullStory();
		else {
			chapterIndexStart = $messages.length - 1;
			startChapterStory();
		}
	}

	function startChapterStory() {
		currentState = 'GENERATING_CHAPTER_STORY';
		appendSystemMessage(
			`Please write the first chapter of a "choose your own adventure" style, ${storyDetails.mood}, fantastical bedtime story set in a ${storyDetails.setting} setting. The story should be based on your previous dream interpretation. Do not include a title as this will be generated later. Make the chapters short and descriptive. After writing your chapter, provide the user with three options to continue the story (Always preface this with a line saying "Choose your path:"). Write the next chapter when they respond with an option or their own custom instruction. Continuing doing this until the user responds with "Wrap it up", where you will wrap up the story in the following chapter. Do not acknowledge this message, just start the story now.`,
			'Choose your own adventure story'
		);
	}

	async function generateFullStory() {
		const response = await appendSystemMessage(
			`Please create a long, ${storyDetails.mood}, fantastical bedtime story set in a ${storyDetails.setting} setting based on your previous dream interpretation. Do not include a title as this will be generated later.`,
			'Your story'
		);

		if (response) story = response;
		storyGenerated = true;
		currentState = 'STORY_GENERATION_FINISHED';
	}

	async function finaliseChapterStory() {
		console.log('story starts at: ' + chapterIndexStart);
		let chapters = $messages.filter(
			(message, i) => message.role == 'assistant' && i > chapterIndexStart
		);
		const choicesRemoved = chapters.map((chapter) => {
			const arr = chapter.content.split('Choose your path:');

			return arr[0];
		});

		const fullStory = choicesRemoved.join('\n').replaceAll('\n\n', '\n');

		console.table(fullStory);
		story = fullStory;
		currentState = 'STORY_GENERATION_FINISHED';
	}

	async function handleOptionClick(e: MouseEvent) {
		const target = e.target as HTMLButtonElement;
		await appendSystemMessage(target.value, 'hidden message');

		if (target.value == 'Wrap it up') finaliseChapterStory();
	}

	async function handleImageGeneration() {
		generatingImage = true;
		const imagePrompt = await appendSystemMessage(
			'Create a short 30 word prompt for AI image generation based on the story, vividly describing the protagonist and plot: ',
			'hidden message'
		).catch((err) => console.log(err));
		if (!imagePrompt) {
			generatingImage = false;
			console.log('error generating prompt...');
			return;
		}
		const data = await fetch('/api/image', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				prompt:
					'A tall full length portrait oriented image 1792px high by 1024px wide. ' +
					`4k, detailed, trending in artstation, mood: ${storyDetails.mood}, setting: ${storyDetails.setting}, studio ghibli, fantastical.` +
					imagePrompt
			})
		});

		const img = await data.json();
		imageUrl = img?.url;
		generatingImage = false;
	}

	function finaliseStory() {
		currentState = 'FINALISING_STORY';
	}

	async function generateTitle() {
		await appendSystemMessage('Generate a short title for this story', 'hidden message');
		let newTitle = $messages.at(-1)?.content;

		if (!newTitle) return;
		title = newTitle.replaceAll('"', '');
	}

	async function handleCustomInstruction(e: SubmitEvent) {
		await appendSystemMessage(customInstruction, 'hidden message');
	}

	async function saveStory() {
		console.table({title, story, imageUrl});
	}

	let storyGenerated = true;
	let generatingImage = false;
	let imageUrl = cover;
	let title = '';
	let customInstruction = '';

	let storyDetails = {
		mood: '',
		setting: '',
		type: ''
	};
	let credits = 5;
</script>

{#if currentState != 'FINALISING_STORY'}
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
					<option>Vast desert</option>
					<option>Dense Jungle</option>
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
		{:else if currentState == 'GENERATING_CHAPTER_STORY'}
			<section class="mt-2 flex flex-col lg:flex-row gap-4">
				<div class="join flex">
					<button
						on:click={handleOptionClick}
						value="option 1"
						disabled={$isLoading}
						class="btn join-item flex-1">Option 1</button
					>
					<button
						on:click={handleOptionClick}
						value="option 2"
						disabled={$isLoading}
						class="btn join-item flex-1">Option 2</button
					>
					<button
						on:click={handleOptionClick}
						value="option 3"
						disabled={$isLoading}
						class="btn join-item flex-1">Option 3</button
					>
				</div>
				<button on:click={handleOptionClick} value="Wrap it up" disabled={$isLoading} class="btn"
					>Wrap it up!</button
				>
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
		{:else if (currentState = 'STORY_GENERATION_FINISHED')}
			<div class="divider">
				<span class="opacity-50 uppercase">Take your time reading</span>
			</div>
			<button on:click={finaliseStory} class="btn mx-auto">Finalise story</button>
		{/if}
	</main>
{:else}
	<main class="grid md:grid-cols-[1fr,_2.25fr] gap-2">
		{#if generatingImage}
			<div
				class="min-h-[400px] md:sticky top-0 w-9/12 sm:w-7/12 md:w-[96%] md:mt-0 mt-4 mx-auto bg-base-200 grid place-items-center animate-pulse"
			>
				<span class="loading loading-spinner loading-md" />
			</div>
		{:else if imageUrl}
			<img
				src={imageUrl}
				alt="cover"
				class="h-min md:sticky top-0 w-9/12 sm:w-7/12 md:w-[96%] md:mt-0 mt-4 mx-auto"
			/>
		{:else}
			<form
				on:submit={handleImageGeneration}
				class="min-h-[400px] md:sticky top-0 w-9/12 sm:w-7/12 md:w-[96%] md:mt-0 mt-4 mx-auto bg-base-200 grid place-items-center"
			>
				<button class="btn btn-ghost">Generate image</button>
			</form>
		{/if}
		<section class="m-2 flex flex-col gap-2">
			<div class="w-full join">
				<input
					disabled={$isLoading}
					bind:value={title}
					type="text"
					class="join-item input flex-1"
				/>
				<button on:click={generateTitle} disabled={$isLoading} class="btn join-item"
					>Generate Title</button
				>
			</div>
			<div class="flex-col flex xl:flex-row justify-end gap-4">
				<div class="flex-1 flex justify-between">
					<article class="flex justify-center items-center gap-2">
						<small>Credits remaining: </small>
						<progress class="progress progress-secondary w-36" value={credits} max="10" />
						<small>{credits}</small>
					</article>
					<label class="cursor-pointer label flex justify-start gap-2">
						<span class="label-text">Make story public</span>
						<input type="checkbox" class="toggle toggle-secondary" />
					</label>
				</div>
				<div class="flex gap-4">
					<button disabled={generatingImage} on:click={handleImageGeneration} class="btn"
						>Generate new image (1 credit)</button
					>
					<button
						on:click={saveStory}
						disabled={$isLoading || generatingImage || title.length == 0}
						class="btn btn-secondary flex-1">Save story</button
					>
				</div>
			</div>
			<!-- <Title {title} /> -->
			<section class="flex gap-4 mx-2 items-center" />
			<div class="divider my-0" />
			<article class="flex flex-col gap-2">
				{#each story.split('\n') as paragraph}
					<p>{paragraph}</p>
				{/each}
			</article>
		</section>
	</main>
{/if}
