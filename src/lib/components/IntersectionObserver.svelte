<script lang="ts">
	import { afterNavigate, goto, onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { newsFeedStories } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	import { createJournal } from '$lib/helpers/journal';
	import CreateIcon from 'virtual:icons/system-uicons/create';
	import { isFollowingFeed } from '$lib';

	let moreToLoad = true;
    let observer: IntersectionObserver;
	let element: HTMLElement;

	$: followingFeed = isFollowingFeed($page.url) ? '?filter=following&' : '?';
	$: nextPage = followingFeed + `skip=${$newsFeedStories.length}`;
	
    onMount(async() => {
        moreToLoad = await checkCount();

		observer = new IntersectionObserver(handleObservation, {
			rootMargin: '1px',
			threshold: 0
		});

		if (element) observer.observe(element);
	});

	afterUpdate(() => {
        if(element && observer) observer.observe(element)
	});

    afterNavigate(async() => {
        moreToLoad = await checkCount();
    })

	async function checkCount() {
		const data = await fetch('/api/stories/count/' + followingFeed);
		const { storyCount } = await data.json();

		return $newsFeedStories.length < storyCount;
	}

	async function handleObservation(entries: IntersectionObserverEntry[]) {
		const observed = entries.some((item) => item.isIntersecting);

		if (observed) {
			if (!moreToLoad) return;

			const data = await fetch(`/api/stories/${nextPage}`);
			const { stories } = await data.json();

			newsFeedStories.update((prev) => [...prev, ...stories]);
			moreToLoad = await checkCount();
		}
	}

	function handleNewStory() {
		const newStory = createJournal();
		goto(`/journal/${newStory.id}`);
	}
</script>

{#if moreToLoad}
	<div bind:this={element} class="w-full h-full bg-secondary-content/80 skeleton" />
	{#each Array(3) as _}
		<div class="h-full w-full bg-secondary-content/80 skeleton" />
	{/each}
{:else}
	<section
		class="flex justify-center items-center gap-2 text-lg bg-secondary-content/80 rounded-xl"
	>
		<button
			class="grid place-items-center duration-200 hover:text-secondary mb-16 py-8 w-full rounded-xl"
			on:click={handleNewStory}
		>
			<CreateIcon class="text-7xl" />
			<p>No stories left...</p>
			<p>Why not start one of your own?</p>
		</button>
	</section>
{/if}
