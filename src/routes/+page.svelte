<script lang="ts">
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import { onMount } from 'svelte';
	import { pageTitle } from '$lib/stores';
	import { resetHeaderImage } from '$lib';
	import Newsfeed from '$lib/components/home/Newsfeed.svelte';
	import WelcomeHero from '$lib/components/home/WelcomeHero.svelte';
	import { afterNavigate } from '$app/navigation';
	import type { DreamJournal } from '$lib/types';

	let allJournals: DreamJournal[];

	onMount(() => {
		pageTitle.set('Dreamcatcher');
		resetHeaderImage();
		allJournals = JSON.parse(localStorage.getItem('journals') || '[]');
		console.log(allJournals);
	});

	onMount(() => {});
	afterNavigate(() => {
		allJournals = JSON.parse(localStorage.getItem('journals') || '');
	});
</script>

<main class="m-2 md:mx-4 mb-16 md:mb-24">
	<SignedIn>
		<Newsfeed stories={allJournals} />
	</SignedIn>
	<SignedOut>
		<WelcomeHero />
	</SignedOut>
</main>
