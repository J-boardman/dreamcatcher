<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { Journal, journal, type DreamJournal } from '$lib/Journals';
	import type { State } from '$lib/stores';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { get } from 'svelte/store';
	let selectElement: HTMLSelectElement;
	let element: HTMLElement;
	let dropdownInFocus = false;
	let allJournals: DreamJournal[] = [];
	import DeleteIcon from 'virtual:icons/line-md/close-circle';

	onMount(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	afterUpdate(() => {
		if (!$journal || !selectElement) return;
		selectElement.value = $journal?.id;
	});

	afterNavigate(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	const changeConversation = (id: string, state?: State) => {
		if (!state) {
			if (!journal || !$journal.lastState) return;
			goto(`/journal/${id}`);
		} else {
			goto(`/journal/${id}`);
		}
	};

	function handleNewConversation() {
		const newConversation = Journal.create(
			Math.random().toString(36).substring(2, 9),
			newDreamName
		);
		changeConversation(newConversation.id, 'INTERPRETING');
		newDreamName = '';
	}

	function handleDelete(id: string) {
		Journal.remove(id);
		allJournals = allJournals.filter((item) => item.id != id);
		if (allJournals.length) changeConversation(allJournals[0].id);
		else handleNewConversation();
	}

	let newDreamName = '';
</script>
<div class="dropdown">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label tabindex="0" class="btn m-1">Conversations </label>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-fit">
		<div class="grid grid-cols-[4fr,_1fr] gap-y-2">
			{#each allJournals as conversation}
				<button
					on:click={() => changeConversation(conversation.id, conversation.lastState)}
					class="btn btn-sm btn-ghost">{conversation.name}</button
				>
				<button
					on:click={() => handleDelete(conversation.id)}
					class="btn btn-circle btn-sm btn-ghost ml-auto"
					><DeleteIcon class="text-error text-xl" /></button
				>
			{/each}
			<input bind:value={newDreamName} type="text" class="input input-sm rounded-r-none" />
			<button on:click={handleNewConversation} class="btn btn-sm rounded-l-none btn-secondary"
				>Add</button
			>
		</div>
	</div>
</div>
<!-- <article class="join">
		<select
			on:change={(e) => changeConversation(e.currentTarget.value)}
			class="select select-sm flex-1 md:flex-none  join-item"
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
			class="input join-item input-sm sm:w-fit"
			placeholder="Journal Name"
		/>
		<button type="submit" class="btn btn-sm join-item" on:click={handleNewConversation}>New</button>
	</section> -->

<!-- disabled={$dreamJournals.length == 1} -->
