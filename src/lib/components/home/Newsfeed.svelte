<script lang="ts">
	import StoryCard from '../ui/StoryCard.svelte';
	import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';
	import { newsFeedStories } from '$lib/stores';
</script>

<section class="my-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max">
	{#each $newsFeedStories as story}
		<a href="/story/{story?.id}">
			<StoryCard {story} />
		</a>
	{/each}
    <IntersectionObserver />
</section>
