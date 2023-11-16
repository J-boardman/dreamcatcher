<script lang="ts">
	import type { ChatRequestOptions } from 'ai';
	import { finaliseInterpretationPrompt } from '$lib/prompts/prompts';
	import { state } from '$lib/stores';
	import { currentJournal } from '$lib/Journals';

	export let input;
	export let isLoading;
	export let messages;
    
	export let handleSubmit: (e: any, chatRequestOptions?: ChatRequestOptions | undefined) => void;
	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;

	async function finaliseInterpretation() {
		if ($currentJournal.messageList.length > 3) {
			await appendSystemMessage(finaliseInterpretationPrompt, 'Final Interpretation');
		}
		
        state.set("CONVERSATION_OVER")
	}

	let credits = 5;
</script>

{#if $state == 'INTERPRETING'}
	<form on:submit={handleSubmit} class="form-control gap-2 m-2 w-full mx-auto">
		<textarea
			bind:value={$input}
			class="textarea textarea-sm"
			placeholder={$messages.length < 2 ? 'Enter details about your dream to get started.' : ''}
		/>
		<div class="gap-4 mt-1 flex ">
			<button disabled={$isLoading} class="btn">Send</button>
			{#if $messages.length > 2}
				<button
					disabled={$isLoading || credits == 0}
					class="btn btn-secondary"
					on:click={finaliseInterpretation}
				>
					Start your story (1 credit)
				</button>

			{/if}
		</div>
	</form>
{/if}
