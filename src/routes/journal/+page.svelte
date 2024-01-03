<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate} from '$app/navigation';
	import type { DreamJournal } from '$lib/types';
	import { removeJournal } from '$lib';
	import JournalCard from '$lib/components/journal/JournalCard.svelte';
	import BottomActions from '$lib/components/ui/BottomActions.svelte';
	import NewJournalButton from '$lib/components/NewJournalButton.svelte';

	let allJournals: DreamJournal[] = [];

	onMount(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	afterNavigate(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	async function handleDelete(id: string) {
		removeJournal(id);
		allJournals = allJournals.filter((item) => item.id != id);
	}

	let newDreamName = '';
</script>

<section class="m-2 md:mx-4 min-h-[calc(100dvh-9rem)]">
	<section class="grid auto-rows-max sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 md:mb-0">
		{#each [...allJournals] as journal, i}
			<JournalCard {journal} {handleDelete} />
		{/each}
	</section>
</section>

<BottomActions>
	<div class="bg-base-200 flex">
		<input
			type="text"
			class="input join-item flex-1 md:flex-none w-60 md:w-fit"
			bind:value={newDreamName}
			placeholder="New Journal Name"
		/>
		<NewJournalButton hideTextOnMobile />
	</div>
</BottomActions>
