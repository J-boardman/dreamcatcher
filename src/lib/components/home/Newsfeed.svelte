<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { createJournal } from '$lib/helpers/journal';
	import type { DreamJournal } from '$lib/types';
	import { onMount } from 'svelte';
	import StoryCard from '../ui/StoryCard.svelte';
	import CreateIcon from 'virtual:icons/system-uicons/create';

    export let stories: DreamJournal[] = [];

	function handleNewStory() {
		const newStory = createJournal();
		goto(`/journal/${newStory.id}?newStory=true`);
	}
</script>

<section class="rounded-xl flex items-center h-min p-4 mx-2 text-lg sm:text-xl justify-between">
	<nav class="flex gap-4 items-center">
		<a href="/">Global</a>
		<a href="/?feed=following">Following</a>
	</nav>
	<button on:click={handleNewStory} class="btn btn-secondary btn-sm md:btn-md">New Story</button>
</section>
<section class="m-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
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
