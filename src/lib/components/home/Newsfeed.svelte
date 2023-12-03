<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { createJournal } from '$lib/helpers/journal';
	import type { DreamJournal } from '$lib/types';
	import StoryCard from '../ui/StoryCard.svelte';
	import CreateIcon from 'virtual:icons/system-uicons/create';
	import PageBanner from '../ui/PageBanner.svelte';
	import { page } from '$app/stores';
    import BottomNavLink from "$lib/components/ui/BottomNavLink.svelte"
    import GlobeIcon from "virtual:icons/fluent-mdl2/world"
    import UserIcon from "virtual:icons/ph/user-bold"

	export let stories: DreamJournal[] = [];

	let followingFeed = false;

	function handleNewStory() {
		const newStory = createJournal();
		goto(`/journal/${newStory.id}?newStory=true`);
	}

	afterNavigate(() => {
		followingFeed = $page.url.searchParams.get('feed') == 'following';
	});
</script>

<section class="my-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
    {#each stories.filter((item) => item.shared) as story, i}
    <a href="/story/{story?.id}">
        <StoryCard {story} />
    </a>
	{/each}
	{#each stories.filter((item) => item.shared) as story, i}
		<a href="/story/{story?.id}">
			<StoryCard {story} />
		</a>
	{/each}
	<section class="flex flex-col justify-center items-center gap-2 text-lg">
		<button
			class="grid place-items-center duration-200 hover:text-secondary mb-16 py-8 bg-secondary-content/80 md:bg-transparent w-full rounded-xl"
			on:click={handleNewStory}
            >
			<CreateIcon class="text-7xl" />
			<p>No stories left...</p>
			<p>Why not start one of your own?</p>
		</button>
	</section>
</section>

<PageBanner>
    <BottomNavLink link="/" active={followingFeed} text="Global">
        <GlobeIcon />
    </BottomNavLink>
    <BottomNavLink link="?feed=following" active={!followingFeed} text="Following">
        <UserIcon />
    </BottomNavLink>
    <button on:click={handleNewStory} class="btn btn-ghost join-item h-full">
        <CreateIcon /> New Story
    </button>
</PageBanner>