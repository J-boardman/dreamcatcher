<script lang="ts">
	import { finaliseInterpretationPrompt } from '$lib/helpers/prompts';
	import { journal, state } from '$lib/stores';
	import { getChatContext, systemMessage, updateJournal } from '$lib';
	import SendIcon from 'virtual:icons/carbon/send';
	import BookIcon from 'virtual:icons/codicon/book';

	const { handleSubmit, messages, isLoading, input, append } = getChatContext();

	async function finaliseInterpretation() {
		if ($journal.messageList.length > 3) {
			await append(systemMessage(finaliseInterpretationPrompt, 'Final Interpretation'));
		}
		updateJournal({ lastState: 'CONVERSATION_OVER' });
		state.set('CONVERSATION_OVER');
	}

	let credits = 5;

	let textInput: HTMLTextAreaElement;

	function handleInput() {
		if (!textInput.value) return;
		textInput.style.height = '';
		if (!(document.activeElement === textInput)) return;
		textInput.style.height = textInput.scrollHeight + 3 + 'px';
	}

	$: placeholderText =
		$messages.length < 2
			? 'Describe your dream'
			: $state == 'STORY_PUBLISHED'
			? 'Discuss your dream'
			: '';
</script>

{#if $state == 'INTERPRETING' || $state == 'STORY_PUBLISHED'}
	<form on:submit={handleSubmit} class="flex flex-row my-2 w-10/12 md:w-full md:mx-auto join">
		<textarea
			on:focus={handleInput}
			on:focusout={handleInput}
			on:input={handleInput}
			bind:this={textInput}
			bind:value={$input}
			class="textarea textarea-xs focus:outline-none focus:border-none text-base flex-1 join-item resize-none max-h-80 h-12"
			placeholder={placeholderText}
		/>
		<button class="btn btn-xs join-item h-full animate-none" disabled={$isLoading}>
			<SendIcon class="text-xl" />
		</button>

		{#if $state == 'INTERPRETING'}
			<button
				disabled={$isLoading || credits == 0}
				class="btn w-fit animate-none join-item h-full"
				on:click={finaliseInterpretation}
			>
				<BookIcon />
				<span class="hidden md:flex">Start Story</span>
			</button>
		{/if}
	</form>
{/if}
