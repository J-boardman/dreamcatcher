<script lang="ts">
	import { imagePrompt, imagePromptMessage } from '$lib/prompts/prompts';
	import { currentStory, state } from '$lib/stores';
	import ConversationList from './ConversationList.svelte';

	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;
	export let isLoading;
	export let messages;

	let generatingImage = false;
	let credits = 5;

	async function handleImageGeneration() {
		generatingImage = true;
		const initialImagePrompt = await appendSystemMessage(imagePromptMessage, 'hidden message');

		const data = await fetch('/api/image', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				prompt: imagePrompt($currentStory.mood, $currentStory.setting) + initialImagePrompt
			})
		});

		const img = await data.json();
		currentStory.update((prev) => ({ ...prev, imageUrl: img?.url }));
		generatingImage = false;
	}

	async function generateTitle() {
		await appendSystemMessage('Generate a short title for this story', 'hidden message');
		let newTitle = $messages.at(-1)?.content;

		if (!newTitle) return;
		currentStory.update((prev) => ({ ...prev, title: newTitle.replaceAll('"', '') }));
	}

	async function saveStory() {
		console.table($currentStory);
	}
</script>

{#if $state == 'FINALISING_STORY'}
	{#if generatingImage}
		<div
			class="min-h-[400px] md:sticky top-0 w-9/12 sm:w-7/12 md:w-[96%] md:mt-0 mt-4 mx-auto bg-base-200 grid place-items-center animate-pulse"
		/>
	{:else if $currentStory.imageUrl}
		<img
			src={$currentStory.imageUrl}
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
		<ConversationList />
		<div class="divider my-0" />
		<div class="w-full join">
			<input
				disabled={$isLoading}
				bind:value={$currentStory.title}
				type="text"
				class="join-item input flex-1"
			/>
			<button on:click={generateTitle} disabled={$isLoading} class="btn join-item">
				Generate Title
			</button>
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
				<button disabled={generatingImage} on:click={handleImageGeneration} class="btn">
					Generate new image (1 credit)
				</button>
				<button
					on:click={saveStory}
					disabled={$isLoading || generatingImage || $currentStory.title.length == 0}
					class="btn btn-secondary flex-1"
				>
					Save story
				</button>
			</div>
		</div>
		<!-- <Title {title} /> -->
		<section class="flex gap-4 mx-2 items-center" />
		<div class="divider my-0" />
		<article class="flex flex-col gap-2">
			{#each $currentStory.story.split('\n') as paragraph}
				<p>{paragraph}</p>
			{/each}
		</article>
	</section>
{/if}
