<script lang="ts">
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';

	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import { newsFeedStories, pageTitle } from '$lib/stores';
	import { resetHeaderImage } from '$lib';

	import Newsfeed from '$lib/components/home/Newsfeed.svelte';
	import WelcomeHero from '$lib/components/home/WelcomeHero.svelte';
	import BottomActions from '$lib/components/ui/BottomActions.svelte';
	import BottomActionLink from '$lib/components/ui/BottomActionLink.svelte';
    import NewJournalButton from "$lib/components/NewJournalButton.svelte"

	import GlobeIcon from 'virtual:icons/fluent-mdl2/world';
	import UserIcon from 'virtual:icons/ph/user-bold';

	$: followingFeed = false;

    export let data;


	onMount(() => {
        pageTitle.set('Dreamcatcher');
		resetHeaderImage();
	});
    
	afterNavigate(() => {
        followingFeed = $page.url.searchParams.get('feed') == 'following';
        console.log($page.url.searchParams.get("feed"))
        newsFeedStories.set(data.stories)
	});
</script>

<main class="m-2 md:mx-4 mb-16 md:mb-24 flex-1 grid">
	<SignedIn>
		<Newsfeed />
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
	    <NewJournalButton />	
	</BottomActions>
</SignedIn>
