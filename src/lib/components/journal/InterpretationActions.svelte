<script>
	import { journal, state } from '$lib/stores';
	import Icon from '@iconify/svelte';
	import { getChatContext, systemMessage, updateJournal } from '$lib';
	import { finaliseInterpretationPrompt } from '$lib/helpers/prompts';

	const { append, isLoading, handleSubmit } = getChatContext();
	async function finaliseInterpretation() {
		if ($journal.messageList.length > 3) {
			await append(systemMessage(finaliseInterpretationPrompt, 'Final Interpretation'));
		}
		updateJournal({ lastState: 'CONVERSATION_OVER' });
		state.set('CONVERSATION_OVER');
	}
</script>

<form on:submit={handleSubmit} class="flex gap-2 mr-2">
    <button class="btn" on:click={handleSubmit} disabled={$isLoading}>
        Send
        <Icon icon="carbon:send" class="text-xl" />
    </button>
	<button type="button" class="btn" on:click={finaliseInterpretation} disabled={$isLoading}>
		Start Story
		<Icon icon="carbon:book" class="text-xl" />
	</button>
</form>
