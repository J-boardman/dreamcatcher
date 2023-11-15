<script>
	import { onNavigate } from '$app/navigation';
	import { journal } from '$lib/journals';
	import resetHeaderImage from '$lib/resetHeaderImage';
	import { currentStory, pageTitle, state } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	
    onMount(() => {
		resetHeaderImage();
		pageTitle.set('Dream Journal');
        journal.matchState();
        if(!$state) $state = "INTERPRETING"
	});

	afterUpdate(() => {
		if ($currentStory.title) pageTitle.set($currentStory.title);
		else pageTitle.set('Dream Journal');
	});

    onNavigate(() => {
        journal.matchState()
    })
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
