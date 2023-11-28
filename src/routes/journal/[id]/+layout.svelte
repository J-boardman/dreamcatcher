<script lang="ts">
	import { page } from '$app/stores';
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
    })

	onMount(() => {
		headerHeight = document.querySelector('header')?.offsetHeight || 0;
		localStorage.setItem('latestConversation', $page.url.pathname);
	});
</script>

<main class="m-2 mb-0 min-h-[calc(100lvh-80px)] flex flex-col">
	<slot />
</main>
