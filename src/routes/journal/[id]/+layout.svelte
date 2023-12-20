<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { setContext } from 'svelte';

	const { setMessages, input, handleSubmit, messages, isLoading, append } = useChat();

	setContext('chat', {
		setMessages,
		input,
		handleSubmit,
		messages,
		isLoading,
		append
	});
</script>

<main class="mt-2 ml-2 flex flex-col flex-1">
	<div class="flex flex-col h-[calc(100dvh-1rem)] md:h-[calc(100svh-5rem)] overflow-scroll">
		<slot />
	</div>
</main>
