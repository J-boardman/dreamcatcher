<script lang="ts">
	import StoryCard from '../ui/StoryCard.svelte';
	import IntersectionObserver from '$lib/components/IntersectionObserver.svelte';
	import { newsFeedStories } from '$lib/stores';
</script>

<section class="my-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
	{#each $newsFeedStories as story, i}
		<a href="/story/{story?.id}">
			<StoryCard {story} lazyLoad={i > 4}/>
		</a>
	{/each}
    <IntersectionObserver />
</section>
