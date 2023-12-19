<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { newsFeedStories } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	import { createJournal } from '$lib/helpers/journal';
	import CreateIcon from 'virtual:icons/system-uicons/create';

	let element: HTMLElement;
    $: storyCount = 100;
    $: currentPage = 0;
    $: feed = $page.url.searchParams.get('feed');
    $: nextPage = `/?skip=${$newsFeedStories.length}${feed == 'following' ? '&feed=following' : ''}`;
    $: moreToLoad = $newsFeedStories.length < storyCount;
	


	onMount(() => {
		let observer = new IntersectionObserver(handleObservation, {
			rootMargin: '1px',
			threshold: 1
		});
        if(element) observer.observe(element);
	});

    afterUpdate(async() => {
        const { totalStories } = await fetch(`/api/stories${nextPage}`).then(r => r.json())
        storyCount = totalStories
    })

	async function handleObservation(entries: IntersectionObserverEntry[]) {
		const observed = entries.some((item) => item.isIntersecting);


		if (observed) {
			if (!moreToLoad) return;
			const newStories = await fetch(`/api/stories${nextPage}`).then((r) => r.json());
			newsFeedStories.update((prev) => [...prev, ...newStories.stories]);
			moreToLoad = $newsFeedStories.length < newStories.totalStories;
		}
	}

	function handleNewStory() {
		const newStory = createJournal();
		goto(`/journal/${newStory.id}`);
	}
</script>

{#if moreToLoad}
	<div bind:this={element} />
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
