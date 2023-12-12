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

<main class="mt-2 mb-0 flex flex-col flex-1">
	<div class="flex flex-col h-[calc(100dvh-1.5rem)] md:h-[calc(100dvh-5rem)] overflow-scroll pl-2">
		<slot />
	</div>
</main>
