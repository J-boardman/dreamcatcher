<script lang="ts">
	import type { ChatRequestOptions } from 'ai';
	import { finaliseInterpretationPrompt } from '$lib/prompts/prompts';
	import { state } from '$lib/stores';
	import { Journal, journal} from '$lib/Journals';
	import { goto } from '$app/navigation';

	export let input;
	export let isLoading;
	export let messages;

	export let handleSubmit: (e: any, chatRequestOptions?: ChatRequestOptions | undefined) => void;
	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;

	async function finaliseInterpretation() {
		if ($journal.messageList.length > 3) {
			await appendSystemMessage(finaliseInterpretationPrompt, 'Final Interpretation');
		}
		Journal.updateState('CONVERSATION_OVER', true);
	}

	let credits = 5;
</script>

{#if $state == 'INTERPRETING'}
	<form on:submit={handleSubmit} class="form-control md:flex-row gap-2 m-2 w-full mx-auto">
		<div class="w-full flex join">
			<textarea
				bind:value={$input}
				class="textarea textarea-xs md:textarea-sm flex-1 join-item resize-none"
				placeholder={$messages.length < 2 ? 'Enter details about your dream to get started.' : ''}
			/>
			<button class="btn btn-secondary join-item h-20" disabled={$isLoading}>Send</button>
		</div>
		{#if $messages.length >= 3}
			<button
				disabled={$isLoading || credits == 0}
				class="btn w-fit md:h-20"
				on:click={finaliseInterpretation}
			>
				Start story (1 credit)
			</button>
		{/if}
	</form>
{/if}
