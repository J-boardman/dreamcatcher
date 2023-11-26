<script lang="ts">
	import cover from '$lib/assets/nice.png';
	import Title from '$lib/components/Title.svelte';
	import { pageTitle } from '$lib/stores';
	import { onMount } from 'svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';

	import HeartIconOutline from 'virtual:icons/line-md/heart';
	import HeartIconFilled from 'virtual:icons/line-md/heart-filled';
	import UserCard from '$lib/components/UserCard.svelte';

	export let data;
	let liked = false;
	let likes = 99;

	onMount(() => pageTitle.set(data.title));

	let showingComments = false;
	function handleLike() {
		if (liked) likes--;
		else likes++;
		liked = !liked;
	}
</script>

<main class="grid md:grid-cols-[1fr,_2.25fr] gap-2">
	<a href="/story/{data.id}/cover">
		<img
			src={cover}
			alt="cover"
			class="md:sticky top-0 grid place-items-center rounded-xl mx-auto"
			style="view-transition-name: testing-{data.id};"
		/>
	</a>
	<section class="m-2 flex flex-col gap-2">
		<div class="md:hidden text-center">
			<Title title={data.title} />
		</div>
		<div class="md:hidden divider my-0" />
		<section
			class="grid grid-cols-[1fr,_max-content] md:grid-cols-[1fr,_max-content,_max-content] gap-4 mx-2 items-center"
		>
			{#await data.streamed.author}
				<UserCard />
			{:then author}
				<UserCard user={author} />
			{/await}
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
				{#each data.story.split('\n') as paragraph}
					<p>{paragraph}</p>
				{/each}
				{#each data.story.split('\n') as paragraph}
					<p>{paragraph}</p>
				{/each}
			</article>
		{/if}
	</section>
</main>
