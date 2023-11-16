<script lang="ts">
	import { Journal, currentJournal } from '$lib/Journals';
	import { imagePrompt, imagePromptMessage } from '$lib/prompts/prompts';
	import { state } from '$lib/stores';
	import JournalList from './JournalList.svelte';

	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;
	export let isLoading;
	export let messages;

	let generatingImage = false;

	$: story = $currentJournal?.story;

	async function handleImageGeneration() {
		generatingImage = true;
		const initialImagePrompt = await appendSystemMessage(imagePromptMessage, 'hidden message');

		const data = await fetch('/api/image', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				prompt: imagePrompt(story?.mood, story?.setting) + initialImagePrompt
			})
		});

		const img = await data.json();
        if(!img.url) return;
		
		Journal.updateStory({ imageUrl: img?.url }, true);
		Journal.refresh();
		generatingImage = false;
	}

	async function generateTitle() {
		await appendSystemMessage('Generate a short title for this story', 'hidden message');
		let newTitle = $messages.at(-1)?.content.replaceAll('"', '');

		if (!newTitle) return;
		Journal.updateStory({ title: newTitle }, true);
		Journal.refresh();
	}

	async function saveStory() {
		console.table(story);
	}
</script>

{#if $state == 'FINALISING_STORY'}
	<figure class=" sm:w-[70%] md:w-[50%] lg:w-[45%] xl:w-[30%] grid place-items-center rounded-xl mx-auto">
		{#if generatingImage}
			<div class="w-full h-full skeleton" />
		{:else if story?.imageUrl}
			<img src={story?.imageUrl} alt="cover" class="w-full" />
		{:else}
			<!-- <div class="bg-base-200 w-full h-full grid place-items-center rounded-xl">No image yet</div> -->
		{/if}
	</figure>
	<section class="m-2 flex flex-col gap-2 flex-1">
		<JournalList />
		<div class="divider my-0" />
		<div class="grid md:grid-cols-[2fr,_1fr] gap-2">
			<section class="grid sm:flex sm:join gap-2 sm:gap-0 ">
				<input
					disabled={$isLoading}
					bind:value={story.title}
					type="text"
					class="join-item input flex-1"
				/>
				<button on:click={generateTitle} disabled={$isLoading} class="btn join-item">
					Generate Title
				</button>
			</section>
			<button
				on:click={saveStory}
				disabled={$isLoading || generatingImage || story?.title?.length == 0}
				class="btn btn-secondary"
			>
				Save story
			</button>
		</div>
		<div class="grid grid-cols-2 md:grid-cols-4 justify-end gap-4">
			<button disabled={generatingImage} on:click={handleImageGeneration} class="btn">
				Generate new image (1 credit)
			</button>
			<label class="cursor-pointer label flex justify-start gap-2">
				<span class="label-text">Make story public</span>
				<input type="checkbox" class="toggle toggle-secondary" />
			</label>
		</div>
		<!-- <Title {title} /> -->
		<section class="flex gap-4 mx-2 items-center" />
		<div class="divider my-0" />
		<article class="flex flex-col gap-2">
			{#if story?.story}
				{#each story.story.split('\n') as paragraph}
					<p>{paragraph}</p>
				{/each}
			{/if}
		</article>
	</section>
{/if}
