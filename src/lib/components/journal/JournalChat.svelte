<script lang="ts">
	import { state } from '$lib/stores';
	import { getChatContext } from '$lib';

	const { messages, input} = getChatContext();

	let textInput: HTMLTextAreaElement;

	function handleInput() {
		if (!textInput.value) return;
		textInput.style.height = '64px';
		if (!(document.activeElement === textInput)) return;
		textInput.style.height = textInput.scrollHeight + 3 + 'px';
	}
</script>

{#if $state == 'INTERPRETING' || $state == 'STORY_PUBLISHED'}
	<textarea
		on:focus={handleInput}
		on:focusout={handleInput}
		on:input={handleInput}
		bind:this={textInput}
		bind:value={$input}
		class="textarea textarea-xs focus:outline-none focus:border-none text-base join-item resize-none max-h-80 h-16"
		placeholder={$messages.length == 0 ? "Describe your dream" : "Discuss your dream"}
	/>
{/if}
