<script>
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import cover from '$lib/assets/nice.png';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import Title from "$lib/components/Title.svelte"
	import { onMount } from 'svelte';
	import { pageTitle } from '$lib/stores';

    onMount(() => pageTitle.set("Dreamcatcher"))
</script>

<SignedIn let:user>
	<main class="md:mx-4 grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 auto-rows-auto gap-4 m-2 mx-4">
		{#each Array.from({ length: 10 }) as book, i}
			<div class="card card-compact bg-base-300 shadow-xl">
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
					<p class="opacity-50">Shared by <a href="/profile" class="hover:opacity-100 hover:underline">Jayde Boardman</a></p>
				</div>
			</div>
		{/each}
	</main>
</SignedIn>
<SignedOut>
	<section class="h-screen">
		<p>Welcome to dreamcatcher!</p>
		<SignUpButton mode="modal" />
		<SignInButton mode="modal" />
	</section>
</SignedOut>
