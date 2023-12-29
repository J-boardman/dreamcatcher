<script lang="ts">
	import { afterUpdate, onMount, setContext } from 'svelte';

	import { newsFeedStories, pageTitle } from '$lib/stores';
	import { resetHeaderImage } from '$lib';

	import Newsfeed from '$lib/components/home/Newsfeed.svelte';
	import NewsfeedActions from '$lib/components/NewsfeedActions.svelte';
	export let data;

	onMount(() => {
		pageTitle.set('Dreamcatcher');
		resetHeaderImage();
	});
    
	afterUpdate(() => {
        newsFeedStories.set(data.stories);
	});
</script>

<main class="md:mx-4 mb-16 md:mb-24 flex-1 grid">
	<Newsfeed />
</main>
<NewsfeedActions />