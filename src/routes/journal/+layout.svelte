<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Journal, journal } from '$lib/Journals';
	import resetHeaderImage from '$lib/resetHeaderImage';
	import { pageTitle, state, type State } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';

	onMount(() => {
		// resetHeaderImage();
		// pageTitle.set('Dream Journal');
		// Journal.init();
		// Journal.save();
		// state.subscribe((val) => {
		// 	if (!val) return;
		// 	Journal.update({ lastState: val }, true);
		// 	Journal.save();
		// });
		// state.set($currentJournal?.lastState);
	});

	afterUpdate(() => {
		// if ($currentJournal?.story.title) pageTitle.set($currentJournal.story.title);
		// else pageTitle.set('Dream Journal');
	});
	// $: newState = $page.url.searchParams.get("state") as State || "INTERPRETING";

	// afterNavigate(() => {
	// 	const latestConversation = localStorage.getItem('latestConversation');
	// 	if (!latestConversation) {
	// 		Journal.create(Math.random().toString(36).substring(2, 8), 'Dream Journal');
	// 	} else if ($page.url.pathname == latestConversation) {
	// 		return;
	// 	} else goto(latestConversation);
	// 	// state?.set($currentJournal?.lastState);
	// 	// if(newState) state.set(newState)
	// });
</script>

<!-- <main class="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-[1fr,_2fr] gap-2 "> -->
<slot />
<!-- </main> -->
<!-- {#if $state == 'FINALISING_STORY'}
{:else}
	<main class="m-2 sm:mx-4 h-[calc(100svh-1rem)] md:h-[calc(100svh-6rem)]  grid">
		<slot />
	</main>
{/if} -->
