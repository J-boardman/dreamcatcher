<script lang="ts">
	import { Journal, journal } from '$lib/Journals';
	import { imagePrompt, imagePromptMessage } from '$lib/prompts/prompts';
	import { pageTitle, state } from '$lib/stores';
	import JournalList from './JournalList.svelte';

	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;
	export let isLoading;
	export let messages;

	let generatingImage = false;

	async function handleImageGeneration() {
		generatingImage = true;
		const initialImagePrompt = await appendSystemMessage(imagePromptMessage, 'hidden message');

		const data = await fetch('/api/image', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				prompt: imagePrompt($journal.story.mood, $journal.story?.setting) + initialImagePrompt
			})
		});

		const img = await data.json();
		generatingImage = false;
		if (!img.url) return;

		Journal.updateStory({ imageUrl: img?.url }, true);
	}

	async function generateTitle() {
		await appendSystemMessage(
			`Generate a short title for this story: ${$journal.story.story}`,
			'hidden message'
		);
		let newTitle = $messages.at(-1)?.content.replaceAll('"', '');
		if (!newTitle) return;
		Journal.updateStory({ title: newTitle }, true);
	}

	async function saveStory() {
		console.table($journal.story);
	}
</script>

{#if $state == 'FINALISING_STORY'}
	<section class="grid md:grid-cols-[1fr,_2.25fr] gap-2">
		<figure class="md:sticky top-0">
			{#if generatingImage}
				<div class="w-full h-full skeleton" />
			{:else if $journal.story.imageUrl}
				<img src={$journal.story.imageUrl} alt="cover" class="w-full md:sticky top-0" />
			{:else}
				<!-- <div class="bg-base-200 w-full h-full grid place-items-center rounded-xl">No image yet</div> -->
			{/if}
		</figure>
		<section class="m-2 gap-2 flex-1">
			<JournalList />
			<div class="divider my-0" />
			<div class="grid gap-2 md:grid-cols-2 lg:grid-cols-[3fr,_1fr,_1fr,_1fr]">
				<input
					disabled={$isLoading}
					bind:value={$journal.story.title}
					type="text"
					class="input col-span-2"
				/>
				<button on:click={generateTitle} disabled={$isLoading} class="btn"> Generate Title </button>
				<button disabled={generatingImage} on:click={handleImageGeneration} class="btn">
					Generate image (1 credit)
				</button>
				<label
					class="cursor-pointer label flex justify-center md:justify-start md:col-span-2 gap-2"
				>
					<span class="label-text">Make story public</span>
					<input type="checkbox" class="toggle toggle-secondary" />
				</label>
				<button
					on:click={saveStory}
					disabled={$isLoading || generatingImage || $journal.story.title?.length == 0}
					class="btn btn-secondary md:col-span-2"
				>
					Save story
				</button>
			</div>
			<!-- <Title {title} /> -->
			<section class="flex gap-4 mx-2 items-center" />
			<div class="divider my-0" />
			<article class="flex flex-col gap-2">
				{#if $journal.story.story}
					{#each $journal.story.story.split('\n') as paragraph}
						<p>{paragraph}</p>
					{/each}
				{/if}
			</article>
		</section>
	</section>
{/if}
