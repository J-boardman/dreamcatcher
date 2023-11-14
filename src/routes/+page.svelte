<script>
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import cover from '$lib/assets/nice.png';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import ClerkLoading from 'clerk-sveltekit/client/ClerkLoading.svelte';
	import Title from '$lib/components/Title.svelte';
	import { onMount } from 'svelte';
	import { headerImage, pageTitle } from '$lib/stores';
	import logo from '$lib/assets/logo.png';
	import resetHeaderImage from '$lib/resetHeaderImage';

	export let data;

	onMount(() => {
		pageTitle.set('Dreamcatcher');
		resetHeaderImage()
	});
</script>

<SignedIn let:user>
	<main
		class="md:mx-4 grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto gap-4 m-2 mx-4"
	>
		{#each data.userList as author, i}
			<div class="card card-compact bg-secondary-content/80 shadow-xl">
				<a href="/story/{i + 1}">
					<figure>
						<img
							class="rounded-t-2xl"
							src={cover}
							alt="cover"
							style="view-transition-name:testing-{i + 1};"
						/>
					</figure>
				</a>
				<div class="card-body">
					<Title title="A Firey Escape in Towertown" />
					<p class="opacity-50">
						Shared by <a
							href="/profile/{author.id == user?.id ? '' : author.id}"
							class="hover:opacity-100 hover:underline">@{author.username}</a
						>
					</p>
				</div>
			</div>
		{/each}
	</main>
</SignedIn>
<SignedOut>
	<div class="hero h-[calc(100svh-16rem)]">
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
