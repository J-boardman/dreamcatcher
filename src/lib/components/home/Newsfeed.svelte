<script lang="ts">
	import { goto } from '$app/navigation';
	import { createJournal } from '$lib/helpers/journal';
	import type { StoryWithAuthor } from '$lib/types';
	import StoryCard from '../ui/StoryCard.svelte';
	import CreateIcon from 'virtual:icons/system-uicons/create';

	export let stories: StoryWithAuthor[] = [];
    
    function handleNewStory() {
		const newStory = createJournal();
		goto(`/journal/${newStory.id}`);
	}

</script>

<section class="my-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
	{#each stories as story}
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
