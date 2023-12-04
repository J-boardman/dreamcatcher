<script lang="ts">
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';

	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import { pageTitle } from '$lib/stores';
	import { handleNewStory, resetHeaderImage } from '$lib';
	import type { DreamJournal } from '$lib/types';

	import Newsfeed from '$lib/components/home/Newsfeed.svelte';
	import WelcomeHero from '$lib/components/home/WelcomeHero.svelte';
	import BottomActions from '$lib/components/ui/BottomActions.svelte';
	import BottomActionLink from '$lib/components/ui/BottomActionLink.svelte';

	import CreateIcon from 'virtual:icons/system-uicons/create';
	import GlobeIcon from 'virtual:icons/fluent-mdl2/world';
	import UserIcon from 'virtual:icons/ph/user-bold';

	let allJournals: DreamJournal[];
	let followingFeed = false;

	onMount(() => {
		pageTitle.set('Dreamcatcher');
		resetHeaderImage();
		allJournals = JSON.parse(localStorage.getItem('journals') || '[]');
		console.log(allJournals);
	});

	afterNavigate(() => {
		allJournals = JSON.parse(localStorage.getItem('journals') || '');
		followingFeed = $page.url.searchParams.get('feed') == 'following';
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

<SignedIn>
	<BottomActions>
		<BottomActionLink link="/" active={!followingFeed} text="Global">
			<GlobeIcon />
		</BottomActionLink>
		<BottomActionLink link="?feed=following" active={followingFeed} text="Following">
			<UserIcon />
		</BottomActionLink>
		<button on:click={handleNewStory} class="btn btn-ghost join-item h-full">
			<CreateIcon /> New Story
		</button>
	</BottomActions>
</SignedIn>
