<script lang="ts">
	import { finaliseInterpretationPrompt } from '$lib/prompts/prompts';
	import { journal, state } from '$lib/stores';
	import { Journal, getChatContext } from '$lib';
	import { systemMessage } from '$lib/helpers/appendSystemMessage';

	const { handleSubmit, messages, isLoading, input, append } = getChatContext();

	async function finaliseInterpretation() {
		if ($journal.messageList.length > 3) {
			await append(systemMessage(finaliseInterpretationPrompt, 'Final Interpretation'));
		}
		Journal.update({ lastState: 'CONVERSATION_OVER' }, true);
		state.set('CONVERSATION_OVER');
	}

	let credits = 5;

	let textInput: HTMLTextAreaElement;

	function handleInput() {
		textInput.style.height = '';
		if (!(document.activeElement === textInput)) return;
		textInput.style.height = textInput.scrollHeight + 3 + 'px';
	}
</script>

<!-- on:input={handleInput} -->
{#if $state == 'INTERPRETING'}
	<form on:submit={handleSubmit} class="form-control md:flex-row gap-2 m-2 w-full mx-auto">
		<div class="w-full flex join">
			<textarea
				on:focus={handleInput}
				on:focusout={handleInput}
				on:input={handleInput}
				bind:this={textInput}
				bind:value={$input}
				class="textarea textarea-xs md:textarea-sm flex-1 join-item resize-none leading-6 focus:h-max"
				placeholder={$messages.length < 2 ? 'Enter details about your dream to get started.' : ''}
			/>
			<button class="btn btn-secondary join-item h-full animate-none" disabled={$isLoading}
				>Send</button
			>
		</div>
		<button
			disabled={$isLoading || credits == 0}
			class="btn w-fit md:h-20 animate-none {$messages.length < 3 ? 'hidden' : 'visible'}"
			on:click={finaliseInterpretation}
		>
			Start story (1 credit)
		</button>
	</form>
{/if}
