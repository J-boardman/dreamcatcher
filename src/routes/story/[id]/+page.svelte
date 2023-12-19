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
	import { clerk } from 'clerk-sveltekit/client';
	import AuthorControls from '$lib/components/AuthorControls.svelte';
	import BottomAction from '$lib/components/ui/BottomAction.svelte';
	import StoryAuthorCard from '$lib/components/StoryAuthorCard.svelte';

	// Props
	export let data;
	let { story, author } = data;

	// State
	let imageLink: HTMLAnchorElement;
	$: currentUserID = $clerk?.user?.id;

	// Hooks
	afterNavigate(() => {
		pageTitle.set(story.title);
		imageLink.href = window?.innerWidth > 640 ? `/story/${data.id}/cover` : '#';
	});
</script>

<main class="grid md:grid-cols-2 lg:grid-cols-[2.06fr,1fr] gap-2 flex-1">
	<figure class="aspect-4/7 h-full w-full sm:w-3/5 mx-auto md:w-full  md:order-2">
		{#if story.imageUrl}
			<a
				bind:this={imageLink}
				href="#?"
				class="sticky top-0"
				style="view-transition-name: testing-{data.id};"
			>
				<CldImage src={story.imageUrl} height={1433} width={819} />
			</a>
		{:else}
			<ImagePlaceholder />
		{/if}
	</figure>
	<div class="md:hidden text-center m-2">
		<Title title={story?.title} />
		<div class="divider mx-2 my-0" />
	</div>
	<article class="flex flex-col gap-2 mx-2 md:text-lg leading-7 pb-20">
		{#each story?.story.split('\n') || [] as paragraph}
			<p>{paragraph}</p>
		{/each}
	</article>
</main>

<BottomActions>
	<LikeButton storyID={story.id} liked={data.liked} likes={data.likes} />
	{#if author.id == currentUserID}
		<AuthorControls storyId={story.id} isShared={story.shared} />
	{:else}
		<StoryAuthorCard {author} />
	{/if}
</BottomActions>
