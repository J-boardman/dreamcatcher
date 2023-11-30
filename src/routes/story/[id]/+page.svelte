<script lang="ts">
	// Imports
	import { onMount } from 'svelte';
	import { clerk } from 'clerk-sveltekit/client';

	// Components
	import Title from '$lib/components/Title.svelte';
	import UserCard from '$lib/components/UserCard.svelte';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import CommentSection from '$lib/components/CommentSection.svelte';
	import LikeButton from '$lib/components/LikeButton.svelte';

	// Types
	import type { DreamJournal, Story } from '$lib/types.js';
	import type { UserResource } from '@clerk/types';

	// Helpers
	import { Journal } from '$lib';
	import { CldImage } from 'svelte-cloudinary';

	// Props
	export let data;

	// State
	let showingComments = false;
	let liked = false;
	let likes = 99;
    let journal: DreamJournal
	let story: Story;
	let coverImage = '';
	$: currentUser = $clerk?.user as UserResource;

	// Hooks
	onMount(() => {
		const foundJournal = Journal.getCurrentJournal() as DreamJournal;
		story = foundJournal.story;
		coverImage = foundJournal?.image?.url;
        journal = foundJournal
	});
</script>

<main class="grid sm:grid-cols-[1fr,_1fr] lg:grid-cols-[1fr,2.35fr] gap-2">
	<figure class="aspect-4/7 sm:aspect-auto">
		{#if journal?.finalImageUrl}
			<a
				href={window.innerWidth > 640 ? `/story/${data.id}/cover` : '#'}
				class="sticky top-0"
				style="view-transition-name: testing-{data.id};"
			>
				<CldImage src={journal?.finalImageUrl} height={1024} width={1792} style="height: 100%" />
			</a>
		{:else}
			<ImagePlaceholder />
		{/if}
	</figure>
	<section class="m-2 flex flex-col gap-2">
		<hgroup class="mx-4 text-center md:text-left">
			<Title title={story?.title} />
		</hgroup>
		<div class="divider my-0" />
		<section
			class="grid grid-cols-[1fr,_max-content] md:grid-cols-[1fr,_max-content,_max-content] gap-4 mx-2 items-center"
		>
			<UserCard user={currentUser} />
			<LikeButton {liked} {likes} />
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
			<article class="flex flex-col gap-6 m-4 leading-7">
				{#each story?.story.split('\n') || [] as paragraph}
					<p>{paragraph}</p>
				{/each}
				{#each Array(4) as _}
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias optio dicta quia fugit
						iure, temporibus dolore. Delectus alias modi debitis voluptate quam quae magni porro
						maiores, enim, error sint, repellendus nobis aliquam. Laboriosam, molestias! Recusandae
						in deleniti officiis inventore laboriosam nostrum commodi quisquam nulla rerum
						voluptatem sapiente distinctio laborum ullam enim ducimus possimus, amet omnis tenetur,
						aut beatae perspiciatis! Voluptate quibusdam odit nulla eius? Quam ullam accusantium
						dolores quia nihil possimus illum. Aspernatur, voluptatibus officia natus laudantium
						delectus veniam ex vero nobis, corrupti consequuntur labore odio accusamus dolorem,
						itaque animi neque aliquam incidunt voluptas! Nesciunt, ea. Natus voluptates provident
						adipisci, molestias a architecto id nemo reiciendis distinctio facilis magnam facere?
						Obcaecati ipsa eveniet quam fugit in ratione exercitationem alias iure soluta cumque,
						consequatur sit dolore. Quisquam dolor natus optio iure dolorem repellat nam, facilis
						incidunt veniam! Facilis maiores ullam dignissimos. Mollitia laudantium non magni
						doloremque consequuntur esse itaque culpa debitis hic soluta rem est eveniet labore, ut
						quod natus laboriosam iusto veritatis perspiciatis doloribus quam consequatur et?
						Nostrum eos libero beatae iusto est, vitae provident deserunt labore quia perspiciatis
						commodi nobis saepe dolor corrupti asperiores velit harum recusandae accusamus, tempora
						consequuntur magni odio deleniti dolorum. Vero, architecto earum? Dolorum, quia.
					</p>
				{/each}
			</article>
		{/if}
	</section>
</main>
