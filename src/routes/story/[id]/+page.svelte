<script lang="ts">
	// Components
	import Title from '$lib/components/Title.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import LikeButton from '$lib/components/story/LikeButton.svelte';
	import BottomActions from '$lib/components/ui/BottomActions.svelte';

	// Helpers
	import { CldImage } from 'svelte-cloudinary';
	import { pageTitle } from '$lib/stores.js';
	import { afterNavigate } from '$app/navigation';

	// Props
	export let data;
	let { story, author } = data;
    
	afterNavigate(() => {
		pageTitle.set(story.title);
		imageLink.href = window?.innerWidth > 640 ? `/story/${data.id}/cover` : '#';
	});

	let imageLink: HTMLAnchorElement;
</script>

<main class="grid sm:grid-cols-[1fr,_1fr] lg:grid-cols-[2.35fr,1fr] gap-2 flex-1 md:ml-4">
	<section class="flex flex-col gap-2 order-2 md:order-1">
		<div class="md:hidden text-center">
			<Title title={story?.title} />
		</div>
		<div class="divider mx-2 my-0 md:col-span-2" />
		<article class="flex flex-col gap-2 mx-2 my-6 leading-7 pb-20">
			{#each story?.story.split('\n') || [] as paragraph}
				<p>{paragraph}</p>
			{/each}
		</article>
	</section>
	<figure class="aspect-4/7 sm:aspect-auto h-full order-1 md:order-2">
		{#if story.imageUrl}
			<a
				bind:this={imageLink}
                href="#?"
				class="sticky top-0"
				style="view-transition-name: testing-{data.id};"
			>
				<CldImage src={story.imageUrl} height={990} width={1732} class="h-full" />
			</a>
		{:else}
			<ImagePlaceholder />
		{/if}
	</figure>
</main>

<BottomActions>
	<LikeButton storyID={story.id} liked={data.liked} likes={data.likes} />
	<a href="/profile/{author.id}" class="btn h-full flex flex-1 items-center pr-4">
		<div class="avatar">
			{#if author}
				<div class="mask mask-squircle w-9 h-9">
					<img src={author?.imageUrl + '?enhanced'} alt="profile" />
				</div>
			{:else}
				<div class="mask mask-squircle w-12 h-12 skeleton" />
			{/if}
		</div>
		<div class="flex flex-col text-left gap-1">
			{#if author}
				<p class="opacity-50 font-normal">Story shared by</p>
				<p>@{author?.username}</p>
			{:else}
				<div class="font-bold w-[20ch] h-6 skeleton" />
				<div class="text-sm opacity-50 w-[20ch] h-4 skeleton" />
			{/if}
		</div>
	</a>
</BottomActions>
