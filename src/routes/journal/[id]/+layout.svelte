<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { updateJournal } from '$lib';
	import { state } from '$lib/stores';
	import { useChat } from 'ai/svelte';
	import { onMount, setContext } from 'svelte';
	let headerHeight = 0;

	const { setMessages, input, handleSubmit, messages, isLoading, append } = useChat();

	setContext('chat', {
		setMessages,
		input,
		handleSubmit,
		messages,
		isLoading,
		append
	});

	onMount(() => {
		headerHeight = document.querySelector('header')?.offsetHeight || 0;
	});

	afterNavigate(() => {
		if ($page.url.searchParams.get('newStory')) {
			updateJournal({ lastState: 'CONVERSATION_OVER' });
			state.set('CONVERSATION_OVER');
		}
	});
</script>

<main class="mt-2 mb-0 flex flex-col flex-1">
	<div class="flex flex-col h-[calc(100dvh-1.5rem)] md:h-[calc(100dvh-5rem)] overflow-scroll pl-2">
		<slot />
	</div>
</main>
