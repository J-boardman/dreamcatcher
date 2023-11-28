<script lang="ts">
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import cover from '$lib/assets/nice.png?enhanced';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import Title from '$lib/components/Title.svelte';
	import { onMount } from 'svelte';
	import { journal, pageTitle } from '$lib/stores';
	import { Journal, resetHeaderImage } from '$lib';
	import type { DreamJournal } from '$lib/types.js';
	import { afterNavigate } from '$app/navigation';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';

	export let data;
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
</script>

<SignedIn let:user>
	<main
		class="md:mx-4 grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 auto-rows-auto gap-4 m-2 mx-4"
	>
		<div class="bg-secondary-content h-full w-full rounded-xl grid place-items-center">
			Start a new story
		</div>
		{#each allJournals.filter((item) => item.shared) as story, i}
			<a href="/story/{story?.id}" class="card card-compact shadow-xl">
				<section
					class="cursor-pointer md:absolute w-full h-fit md:h-full duration-500 opacity-90 md:opacity-0 hover:opacity-90 flex items-end order-2 md:order-1"
				>
					<section class="bg-secondary-content w-full p-4 rounded-b-xl">
						<div>
							<div class="text-lg opacity-50">Read the story:</div>
							<Title title={story?.story.title} fontSize="text-2xl" />
						</div>
						<div class="flex items-center gap-3 my-1">
							<div class="avatar">
								<a href="/profile" class="mask mask-squircle w-12 h-12">
									<img src={user?.imageUrl} alt="Avatar Tailwind CSS Component" />
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
					class="bg-secondary-content h-full rounded-t-xl rounded-b-none md:rounded-b-xl -z-[1]"
				>
					{#if story.imageUrl}
						<img
							class="rounded-t-2xl"
							src={story.imageUrl}
							alt="cover"
							style="view-transition-name:testing-{story.id};"
							on:error={() => (story.imageUrl = '')}
						/>
					{:else}
						<ImagePlaceholder />
					{/if}
				</figure>
				<!-- <div class="card-body">
					<Title title={story.story.title} />
					<p class="opacity-50">
						Shared by
						{#await data.streamed?.userList}
							@loading-user
						{:then author}
							<a
								href="/profile/{author[i]?.id == user?.id ? '' : author[i]?.id}"
								class="hover:opacity-100 hover:underline"
							>
								@{author[i]?.username}
							</a>
						{/await}
					</p>
				</div> -->
			</a>
		{/each}
	</main>
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
