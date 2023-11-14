<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { dreamInterpretatorPrompt } from '$lib/prompts/prompts';
	import { conversations, type Conversation } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';

	$: conversationID = $page.url.searchParams.get('conversation')?.toString();
	let showBanner = false;
	onMount(() => {
		conversations.set(JSON.parse(localStorage.getItem('conversations') || '[]'));

		if (!$conversations.length) {
			showBanner = true;
			const newConversation = addConversation('My First Dream Journal');
			goto(`/journal?conversation=${newConversation.id}`);
			localStorage.setItem('conversations', JSON.stringify([...$conversations]));
			conversations.set(JSON.parse(localStorage.getItem('conversations') || '[]'));
		} else if (!conversationID) {
			goto(`/journal?conversation=${$conversations[0].id}`);
		}
	});

	let selectElement: HTMLSelectElement;

	afterUpdate(() => {
		const found = $conversations.find((item) => item.id == conversationID);
		if (found && selectElement) {
			selectElement.value = found.id;
		}
	});

	function addConversation(name?: string) {
		const newConversation: Conversation = {
			id: Math.random().toString(36).substring(2, 9),
			lastState: 'INTERPRETING',
			lastUpdated: new Date(),
			messageList: [
				{
					role: 'assistant',
					id: Math.random().toString(36).substring(2, 9),
					content: dreamInterpretatorPrompt
				}
			],
			name: name
		};
		conversations.update((prev) => [...prev, newConversation]);
		localStorage.setItem('conversations', JSON.stringify($conversations));
		return newConversation;
	}
	function handleNewConversation() {
		const newConversation = addConversation(newDreamName);
		goto(`/journal?conversation=${newConversation.id}`);
	}

	function handleConversationChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		goto(`/journal?conversation=${target.value}`);
	}

	function deleteConversation() {
		conversations.update((prev) => prev.filter((item) => item.id != conversationID));
		if ($conversations.length) {
			goto(`/journal?conversation=${$conversations[0].id}`);
		} else {
			goto('/journal', { replaceState: true });
		}
		localStorage.setItem('conversations', JSON.stringify($conversations));
	}

	let newDreamName = '';
</script>

<form
	on:submit={handleNewConversation}
	class="join flex gap-2 h-min justify-center mb-auto w-full pb-1"
>
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
	<button disabled={$conversations.length == 1} on:click={deleteConversation} class="btn btn-sm"
		>Delete</button
	>
	<input
		type="text"
		bind:value={newDreamName}
		class="input join-item input-sm"
		placeholder="Conversation Name"
	/>
	<button type="submit" class="btn btn-sm join-item">New</button>
</form>
