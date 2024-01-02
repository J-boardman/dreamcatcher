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

<main class="mt-2 ml-2 flex flex-col flex-1 gap-2">
	<div class="flex-1 flex flex-col max-h-[calc(100dvh-1rem)]  md:max-h-[calc(100dvh-4.5rem)] overflow-scroll gap-2">
		<slot />
	</div>
</main>