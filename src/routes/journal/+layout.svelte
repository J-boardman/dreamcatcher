<script>
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { Journal, allJournals, currentJournal } from '$lib/Journals';
	import resetHeaderImage from '$lib/resetHeaderImage';
	import { pageTitle, state } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';

	onMount(() => {
		Journal.loadMostRecentConversation();
		resetHeaderImage();
		pageTitle.set('Dream Journal');
		Journal.init();
		Journal.save();
		state.subscribe((val) => {
			if (!val) return;
			Journal.update({ lastState: val });
			Journal.save();
		});
		state.set($currentJournal?.lastState);
	});

	afterUpdate(() => {
		if ($currentJournal?.story.title) pageTitle.set($currentJournal.story.title);
		else pageTitle.set('Dream Journal');
	});

	afterNavigate(() => {
		state?.set($currentJournal?.lastState);
	});
</script>

{#if $state == 'FINALISING_STORY'}
	<main class="flex flex-col lg:flex-row gap-2">
		<slot />
	</main>
{:else}
	<main class="m-2 sm:mx-4 h-[calc(100svh-1rem)] md:h-[calc(100svh-6rem)] grid">
		<slot />
	</main>
{/if}
