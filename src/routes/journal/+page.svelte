<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import type { DreamJournal } from '$lib/types';
	import { createJournal, removeJournal } from '$lib';
	import JournalCard from '$lib/components/journal/JournalCard.svelte';
	import BottomActions from '$lib/components/ui/BottomActions.svelte';
	import CreateIcon from 'virtual:icons/system-uicons/create';

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
	}

	async function handleDelete(id: string) {
		removeJournal(id);
		allJournals = allJournals.filter((item) => item.id != id);
	}

	let newDreamName = '';
</script>

<section class="m-2 md:mx-4">
	<section
		class="grid auto-rows-max sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16 md:mb-0"
	>
		{#each [...allJournals] as journal, i}
			<JournalCard {journal} {handleDelete} />
		{/each}
	</section>
</section>

<BottomActions>
	<input
		type="text"
		class="h-full input join-item flex-1 md:flex-none w-60 md:w-fit"
		bind:value={newDreamName}
		placeholder="New Journal Name"
	/>
	<button on:click={handleNewConversation} class="btn join-item h-full">
		<CreateIcon />
		<span class="hidden md:flex">New Journal</span>
	</button>
</BottomActions>
