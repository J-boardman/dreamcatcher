<script>
	import resetHeaderImage from '$lib/resetHeaderImage';
	import { currentStory, pageTitle, state } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	state.set('STORY_GENERATION_FINISHED');
	onMount(() => {
		resetHeaderImage();
		pageTitle.set('Dream Journal');
	});

	afterUpdate(() => {
		if ($currentStory.title) pageTitle.set($currentStory.title);
		else pageTitle.set('Dream Journal');
	});
</script>

{#if $state == 'FINALISING_STORY'}
	<main class="grid md:grid-cols-[1fr,_2.25fr] gap-2">
		<slot />
	</main>
{:else}
	<main class="m-2 mx-4 h-[calc(100svh-1rem)] md:h-[calc(100svh-6rem)] grid">
		<slot />
	</main>
{/if}
