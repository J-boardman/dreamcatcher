<script lang="ts">
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import Title from '$lib/components/Title.svelte';
	import { onMount } from 'svelte';
	import { pageTitle } from '$lib/stores';
	import type { DreamJournal } from '$lib/types.js';
	import { afterNavigate, goto } from '$app/navigation';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import { CldImage } from 'svelte-cloudinary';
	import { createJournal, resetHeaderImage } from '$lib';

	let allJournals: DreamJournal[] = [];
	onMount(() => {
		pageTitle.set('Dreamcatcher');
		resetHeaderImage();
		allJournals = JSON.parse(localStorage.getItem('journals') || '[]');
		console.log(allJournals);
	});

	afterNavigate(() => {
		allJournals = JSON.parse(localStorage.getItem('journals') || '');
	});

	function handleNewStory() {
		const newStory = createJournal('New Story');
		goto(`/journal/${newStory.id}?newStory=true`);
	}
</script>

<SignedIn let:user>
	<section class="rounded-xl flex items-center h-min p-4 mx-2 text-lg sm:text-xl justify-between">
		<nav class="flex gap-4 items-center">
			<a href="/">Global</a>
			<a href="/?feed=following">Following</a>
		</nav>
		<button on:click={handleNewStory} class="btn btn-secondary btn-sm md:btn-md">New Story</button>
	</section>
	<section class="m-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
		{#each allJournals.filter((item) => item.shared) as story, i}
			<a href="/story/{story?.id}" class="card card-compact min-h-[450px] group shadow-secondary">
				<section
					class="group-hover:opacity-80 cursor-pointer md:absolute w-full bottom-0 h-fit duration-500 md:opacity-0 flex items-end order-2 md:order-1"
				>
					<section
						class="w-full p-4 rounded-b-xl bg-secondary-content/80 md:bg-gradient-to-t md:from-95% md:from-secondary-content"
					>
						<div>
							<div class="text-lg opacity-50">Read the story:</div>
							<Title title={story?.story.title} fontSize="text-2xl" />
						</div>
						<div class="flex items-center gap-3 my-1">
							<div class="avatar">
								<a href="/profile" class="mask mask-squircle w-12 h-12">
									<img src={user?.imageUrl} alt="profile" />
								</a>
							</div>
							<div>
								<div class="text-sm opacity-50">Shared by</div>
								<a href="/profile" class="font-bold hover:opacity-80">
									@{user?.username}
								</a>
							</div>
						</div>
					</section>
				</section>
				<figure
					class="bg-secondary-content/70 group-hover:bg-secondary-content/80 h-full rounded-t-xl rounded-b-none md:rounded-b-xl -z-[1]"
				>
					{#if story.finalImageUrl}
						<figure
							class="rounded-t-2xl aspect-4/7 w-full h-auto"
							style="view-transition-name: testing-{story.id};"
						>
							<CldImage src={story.finalImageUrl} height={1024} width={1792} style="height: 100%" />
							<!-- on:error={() => (story.image.url = '')} -->
						</figure>
					{:else}
						<ImagePlaceholder />
					{/if}
				</figure>
			</a>
		{/each}
	</section>
</SignedIn>
<SignedOut>
	<div class="hero h-[calc(100lvh-16rem)]">
		<div class="hero-content text-center max-w-3xl">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">
					Unlock the <span class="text-secondary">Hidden Meanings</span> of your dreams!
				</h1>
				<p class="py-6">
					Welcome to our dream interpretation and storytelling service, where the mysterious realm
					of dreams comes alive! Relax as our AI dream interpreter and bedtime storyteller provides
					captivating insights and imaginative tales based on your dreams!
				</p>
				<div class="flex gap-4 justify-center">
					<SignInButton class="btn" mode="modal" />
					<SignUpButton class="btn btn-secondary" mode="modal" />
				</div>
			</div>
		</div>
	</div>
</SignedOut>
