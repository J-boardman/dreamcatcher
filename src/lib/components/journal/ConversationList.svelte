<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { addConversation, deleteConversation, findConversation, loadConversations } from '$lib/conversations';
	import { conversations, type Conversation } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';

	let conversationID = $page.url.searchParams.get('conversaton') || '';

	onMount(() => {
		conversations.set(loadConversations());
		if (!$conversations.length) {
			const newConversation = addConversation('My First Dream Journal');
			changeConversation(newConversation.id);
			conversations.set(loadConversations());
		} else if (!conversationID) {
			changeConversation($conversations[0].id);
		}
	});

	let selectElement: HTMLSelectElement;

	afterUpdate(() => {
		const conversation = findConversation(conversationID);
		if (!conversation || !selectElement) return;
  
		selectElement.value = conversation.id;
	});

	function handleNewConversation() {
		const newConversation = addConversation(newDreamName);
		changeConversation(newConversation.id);
	}

	function handleConversationChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		changeConversation(target.value);
	}

	function handleConversationDelete() {
		deleteConversation(conversationID);
		if ($conversations.length) {
			 changeConversation($conversations[0].id);
		} else {
			goto('/journal', { replaceState: true });
		}
	}

    function changeConversation(id: string){
        goto(`/journal?=conversation=${id}`)
    }

	let newDreamName = '';
</script>

<section class="join flex gap-2 h-min justify-center mb-auto w-full pb-1">
	<select
		on:change={handleConversationChange}
		class="select select-sm flex-1 md:flex-none md:ml-auto"
		bind:this={selectElement}
	>
		<option disabled selected>Journals</option>
		{#each $conversations as conversation}
			<option value={conversation?.id}>
				{conversation.name || conversation?.id}
			</option>
		{/each}
	</select>
	<button
		disabled={$conversations.length == 1}
		on:click={handleConversationDelete}
		class="btn btn-sm">Delete</button
	>
	<input
		type="text"
		bind:value={newDreamName}
		class="input join-item input-sm"
		placeholder="Conversation Name"
	/>
	<button type="submit" class="btn btn-sm join-item" on:click={handleNewConversation}>New</button>
</section>
