<script lang="ts">
	import { goto } from '$app/navigation';
	import { Journal, allJournals, currentJournal } from '$lib/Journals';
	import { afterUpdate } from 'svelte';

	let selectElement: HTMLSelectElement;
    export let bottomMargin = false;

	afterUpdate(() => {
		if (!$currentJournal || !selectElement) return;
		selectElement.value = $currentJournal?.id;
	});

	const changeConversation = (id: string) => goto(`/journal?conversation=${id}`);

	function handleNewConversation() {
		const newConversation = Journal.create(newDreamName);
        Journal.save()
		changeConversation(newConversation.id);
		newDreamName = '';
	}

	function handleDelete() {
		Journal.remove();
        Journal.save()
		if ($allJournals.length) changeConversation($allJournals[0].id);
		else handleNewConversation();
	}

	let newDreamName = '';
</script>

<section class="grid sm:flex gap-2 h-min justify-center md:justify-end w-full pb-1 {bottomMargin ? "mb-auto" : ""}">
	<article class="join w-full">
		<select
			on:change={(e) => changeConversation(e.currentTarget.value)}
			class="select select-sm flex-1 md:flex-none join-item"
			bind:this={selectElement}
		>
			<option disabled selected>Journals</option>
			{#each $allJournals as conversation}
				<option value={conversation?.id}>
					{conversation.name || conversation?.id}
				</option>
			{/each}
		</select>
		<button on:click={handleDelete} class="btn btn-sm join-item">Delete</button>
	</article>
	<section class="join">
		<input
			type="text"
			bind:value={newDreamName}
			class="input join-item input-sm"
			placeholder="Conversation Name"
		/>
		<button type="submit" class="btn btn-sm join-item" on:click={handleNewConversation}>New</button>
	</section>
</section>

<!-- disabled={$dreamJournals.length == 1} -->
