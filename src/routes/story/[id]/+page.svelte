<script lang="ts">
	import Title from '$lib/components/Title.svelte';
	import { pageTitle } from '$lib/stores';
	import { onMount } from 'svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';

	import HeartIconOutline from 'virtual:icons/line-md/heart';
	import HeartIconFilled from 'virtual:icons/line-md/heart-filled';
	import UserCard from '$lib/components/UserCard.svelte';
	import type { DreamJournal, Story } from '$lib/types.js';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import { clerk } from 'clerk-sveltekit/client';
	import type { UserResource } from '@clerk/types';

	export let data;
	let liked = false;
	let likes = 99;
	let story: Story;
	let coverImage = '';
	let currentUser = $clerk?.user as UserResource;

	onMount(() => {
		const journals: DreamJournal[] = JSON.parse(localStorage.getItem('journals') || '[]');
		const journal = journals.find((item) => item.id == data.id) as DreamJournal;
		story = journal.story;
		coverImage = journal.imageUrl;
	});

	let showingComments = false;
	function handleLike() {
		if (liked) likes--;
		else likes++;
		liked = !liked;
	}
</script>

<main class="grid md:grid-cols-[1fr,_1fr] lg:grid-cols-[1fr,_80ch] xl:grid-cols-[1fr,2.65fr] gap-2">
	<figure class="grid place-items-center rounded-xl mx-auto">
		{#if coverImage}
			<a href="/story/{data.id}/cover" class="hidden md:flex">
				<img
					src={coverImage}
					alt="cover"
					style="view-transition-name: testing-{data.id};"
					class="sticky top-0"
					on:error={() => (coverImage = '')}
				/>
			</a>
			<img
				src={coverImage}
				alt="cover"
				style="view-transition-name: testing-{data.id};"
				class="sticky top-0 md:hidden"
				on:error={() => (coverImage = '')}
			/>
		{:else}
			<ImagePlaceholder />
		{/if}
	</figure>
	<section class="m-2 flex flex-col gap-2">
		<Title title={story?.title} />
		<div class="divider my-0" />
		<section
			class="grid grid-cols-[1fr,_max-content] md:grid-cols-[1fr,_max-content,_max-content] gap-4 mx-2 items-center"
		>
			<UserCard user={currentUser} />
			<button
				class="btn btn-ghost hover:bg-transparent {liked ? 'text-primary' : 'text-white'}"
				on:click={handleLike}
			>
				{likes}
				{#if liked}
					<HeartIconFilled class="text-2xl text-primary" />
				{:else}
					<HeartIconOutline class="text-2xl hover:text-primary" />
				{/if}
			</button>
			<div class="join flex col-span-2 md:col-span-1">
				<button
					on:click={() => (showingComments = false)}
					class=" flex-1 md:col-span-1 join-item btn {!showingComments ? 'btn-secondary' : ''}"
				>
					Story
				</button>
				{#await data.streamed.comments}
					<button class=" flex-1 md:col-span-1 join-item btn w-max" disabled> Comments </button>
				{:then}
					<button
						on:click={() => (showingComments = true)}
						class=" flex-1 md:col-span-1 join-item btn {showingComments ? 'btn-secondary' : ''}"
					>
						Comments
					</button>
				{/await}
			</div>
		</section>
		<div class="divider my-0" />
		{#if showingComments}
			{#await data.streamed.comments then comments}
				<CommentSection {comments} />
			{/await}
		{:else}
			<article class="flex flex-col gap-2">
				{#each story?.story.split('\n') || [] as paragraph}
					<p>{paragraph}</p>
				{/each}
			</article>
		{/if}
	</section>
</main>
