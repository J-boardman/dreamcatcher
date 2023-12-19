<script lang="ts">
	// Components
	import Title from '$lib/components/Title.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import LikeButton from '$lib/components/story/LikeButton.svelte';
	import BottomActions from '$lib/components/ui/BottomActions.svelte';
	import StoryAuthorCard from '$lib/components/StoryAuthorCard.svelte';

	// Helpers
	import { CldImage } from 'svelte-cloudinary';
	import { pageTitle } from '$lib/stores.js';
	import { afterNavigate } from '$app/navigation';
	import { clerk } from 'clerk-sveltekit/client';
	import AuthorControls from '$lib/components/AuthorControls.svelte';

	// Props
	export let data;
	let { story, author } = data;

    // State
    let imageLink: HTMLAnchorElement;
    $: currentUserID = $clerk?.user?.id

    // Hooks
	afterNavigate(() => {
		pageTitle.set(story.title);
		imageLink.href = window?.innerWidth > 640 ? `/story/${data.id}/cover` : '#';
	});

</script>

<main class="grid sm:grid-cols-[1fr,_1fr] lg:grid-cols-[2.35fr,1fr] gap-2 flex-1 md:ml-4">
	<section class="flex flex-col gap-2 order-2 sm:order-1">
		<div class="md:hidden text-center">
			<Title title={story?.title} />
		</div>
		<div class="divider mx-2 my-0 md:col-span-2" />
		<article class="flex flex-col gap-2 mx-2 my-6 text-lg leading-7 pb-20">
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
	{#if author.id == currentUserID}
        <AuthorControls storyId={story.id} isShared={story.shared}/>
    {:else}
		<StoryAuthorCard {author} />
	{/if}
</BottomActions>
