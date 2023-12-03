<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import type { DreamJournal } from '$lib/types';
	import { createJournal, removeJournal, wait } from '$lib';
	import JournalCard from '$lib/components/journal/JournalCard.svelte';

	let allJournals: DreamJournal[] = [];

	onMount(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	afterNavigate(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	function handleNewConversation() {
		const newConversation = createJournal(newDreamName);
		goto(`/journal/${newConversation.id}`);
		newDreamName = '';
	}

	async function handleDelete(id: string) {
		removeJournal(id);
		allJournals = allJournals.filter((item) => item.id != id);
	}

	let newDreamName = '';
</script>

<section class="m-2 mx-4">
	<article class="join flex">
		<input type="text" class="input join-item" bind:value={newDreamName} />
		<button on:click={handleNewConversation} class="btn join-item">Add</button>
	</article>
	<div class="divider" />

	<section class="grid auto-rows-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
		{#each [...allJournals] as journal, i}
			<JournalCard {journal} {handleDelete}/>
		{/each}
	</section>
</section>
