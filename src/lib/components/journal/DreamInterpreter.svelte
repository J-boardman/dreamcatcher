<script lang="ts">
	import type { ChatRequestOptions } from 'ai';
	import { finaliseInterpretationPrompt } from '$lib/prompts/prompts';
	import { currentStory, state } from '$lib/stores';

	export let input;
	export let isLoading;
	export let messages;
	export let handleSubmit: (e: any, chatRequestOptions?: ChatRequestOptions | undefined) => void;

	export let appendSystemMessage: (content: string, name: string) => Promise<string | undefined>;

	async function finaliseInterpretation() {
		if ($messages.length > 3) {
			await appendSystemMessage(finaliseInterpretationPrompt, 'Final Interpretation');
		}
		state.set('CONVERSATION_OVER');
	}

	let credits = 5;
</script>

{#if $state == "INTERPRETING"}
<form
	on:submit={handleSubmit}
	class="form-control gap-2 m-2 w-full mx-auto"
>
	<textarea bind:value={$input} class="textarea textarea-sm" placeholder="" />
	<div class="gap-4 mt-1 grid sm:grid-cols-2 md:grid-cols-3">
		<button disabled={$isLoading} class="btn">Send</button>
		{#if $messages.length > 2}
			<button
				disabled={$isLoading || credits == 0}
				class="btn btn-secondary"
				on:click={finaliseInterpretation}
			>
				Start your story (1 credit)
			</button>

			<article class="flex flex-col justify-center gap-2">
				<small>Credits remaining: {credits}</small>
				<progress class="progress progress-secondary w-56" value={credits} max="10" />
			</article>
		{/if}
	</div>
</form>
{/if}
