<script>
	import { headerTitle } from '$lib/stores';
	import { useChat } from 'ai/svelte';
	import { onMount } from 'svelte';
    import Chatbox from "$lib/components/ChatBox.svelte"

	const { input, handleSubmit, messages, isLoading } = useChat({
		initialMessages: [
			{
				role: 'assistant',
				content:
					"Hey there! I'm your personal dream interpreter. I will give you a short interpretation of your dream based on the symbols and themes present in it. Tell me about your dream to get started!",
				id: '001'
			}
		]
	});
	onMount(() => headerTitle.set('Dream Journal'));
</script>

<main class="m-2 max-w-5xl md:mx-auto">
    <Chatbox messages={messages}/>
	<form on:submit={handleSubmit} class="form-control gap-2 m-2 w-full mx-auto">
		<textarea bind:value={$input} class="textarea textarea-sm" />
		<button disabled={$isLoading} class="btn">Send</button>
	</form>
</main>
