<script lang="ts">
	import { goto } from '$app/navigation';
	import { journal } from '$lib/journals';
	import { dreamJournals, currentJournalID, state } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';

	onMount(() => {
		dreamJournals.set(journal.load());
		if (!$dreamJournals.length) {
			const newConversation = journal.create('My First Dream Journal');
			changeConversation(newConversation.id);
			journal.matchState();
			dreamJournals.set(journal.load());
		} else if ($currentJournalID) {
			changeConversation($dreamJournals[0].id);
		}
	});

	let selectElement: HTMLSelectElement;

	afterUpdate(() => {
		const conversation = journal.getByID($currentJournalID);
		if (!conversation || !selectElement) return;
		selectElement.value = conversation.id;
	});

	function handleNewConversation() {
		const newConversation = journal.create(newDreamName);
		changeConversation(newConversation.id);
	}
	function handleConversationDelete() {
		journal.deleteByID($currentJournalID);
	}
	const changeConversation = (id: string) => goto(`/journal?conversation=${id}`);

	let newDreamName = '';
</script>

<section class="join flex gap-2 h-min justify-center mb-auto w-full pb-1">
	<select
		on:change={(e) => changeConversation(e.currentTarget.value)}
		class="select select-sm flex-1 md:flex-none md:ml-auto"
		bind:this={selectElement}
	>
		<option disabled selected>Journals</option>
		{#each $dreamJournals as conversation}
			<option value={conversation?.id}>
				{conversation.name || conversation?.id}
			</option>
		{/each}
	</select>
	<button on:click={handleConversationDelete} class="btn btn-sm">Delete</button>
	<input
		type="text"
		bind:value={newDreamName}
		class="input join-item input-sm"
		placeholder="Conversation Name"
	/>
	<button type="submit" class="btn btn-sm join-item" on:click={handleNewConversation}>New</button>
</section>

<!-- disabled={$dreamJournals.length == 1} -->
