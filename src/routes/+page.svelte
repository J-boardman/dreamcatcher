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
	import { afterNavigate, goto } from '$app/navigation';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import NewStoryIcon from 'virtual:icons/pajamas/doc-new';

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

	function handleNewStory() {
		const newStory = Journal.create('New Story');
		goto(`/journal/${newStory.id}?newStory=true`);
	}
</script>

<SignedIn let:user>
	<main class="grid lg:grid-cols-[2.5fr,_max-content,_1fr] h-full m-2 mx-4 flex-1">
		<section class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-min">
			<section class="md:col-span-2 xl:col-span-3 rounded-xl bg-secondary-content/70 flex items-center h-min p-4">
				<nav class="text-xl flex gap-4">
					<a href="?#">Global</a>
					<a href="?#">Following </a>
				</nav>
			</section>
			<button
				on:click={handleNewStory}
				class="bg-secondary-content/70 hover:bg-secondary-content/80 duration-150 h-full w-full rounded-xl flex flex-col justify-center items-center gap-2"
			>
				<NewStoryIcon class="text-4xl" />
				Start a new story
			</button>
			{#each allJournals.filter((item) => item.shared) as story, i}
				<a href="/story/{story?.id}" class="card card-compact shadow-xl min-h-[450px] group">
					<section
						class="group-hover:opacity-80 cursor-pointer md:absolute w-full bottom-0 h-fit duration-500 opacity-80 md:opacity-0 flex items-end order-2 md:order-1"
					>
						<section
							class="w-full p-4 rounded-b-xl bg-gradient-to-t from-95% from-secondary-content"
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
						{#if story.imageUrl}
							<img
								class="rounded-t-2xl h-full"
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
		</section>
		<div class="divider md:divider-horizontal" />
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
