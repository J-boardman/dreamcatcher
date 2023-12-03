<script lang="ts">
	import { journal } from '$lib/stores';

	import type { Message } from 'ai';
	import ImagePlaceholder from '../ImagePlaceholder.svelte';
	import { onMount } from 'svelte';
	export let message: Message;
	import Modal from '../ui/Modal.svelte';
	import InfoIcon from 'virtual:icons/material-symbols/info';
	import { getChatContext, systemMessage, updateJournal } from '$lib';

	const { setMessages, messages } = getChatContext();

	function handleImageClick() {
		if (message.content == $journal?.image?.url) return;
		updateJournal({ image: { ...$journal.image, url: message.content } });
		setMessages([...$messages, systemMessage('_', 'Cover Image updated')]);
	}

	$: timeRemaining = '0:00';

	function setExpiryTime() {
		setInterval(() => {
			let difference = new Date().getTime() - new Date(message.id).getTime();
			let secondsRemaining = 3600 - Math.round(difference / 1000);
			let minutesRemaining = Math.floor(secondsRemaining / 60);
			let seconds = Math.round(secondsRemaining % 60);
			let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

			if (secondsRemaining < 0) timeRemaining = '0:00';
			else timeRemaining = `${minutesRemaining}:${formattedSeconds}`;
			// timeRemaining = 3600 - Math.round(difference / 1000)
		}, 1000);
	}

	onMount(() => {
		setExpiryTime();
	});
</script>

<article class="chat chat-start">
	{#if message.content}
		<figure
			class="chat-bubble py-4 {message.content == $journal?.image?.url
				? 'bg-secondary'
				: 'bg-base-300'}"
		>
			<button on:click={handleImageClick}>
				<img
					src={message.content}
					alt="cover"
					class="w-96 rounded-t-xl"
					on:error={() => {
						updateJournal({ image: { url: '', created: '' } });
						message.content = '';
					}}
				/>
			</button>
			<div class="flex items-center justify-between p-2 bg-secondary-content rounded-b-xl -mt-2">
				<p>{timeRemaining} until your image expires.</p>

				<Modal buttonText="" classes="btn-ghost btn-sm btn-circle">
					<svelte:fragment slot="logo">
						<InfoIcon class="text-2xl text-primary" />
					</svelte:fragment>
					<h2 class="text-3xl">About Image Generation</h2>
					<div class="divider divider-neutral" />
					<p>Images are generated from Open AI's DALLE-3 image generation model.</p>
				</Modal>
			</div>
		</figure>
	{:else}
		<div class="w-64 md:w-96 chat-bubble bg-base-300">
			<ImagePlaceholder message="image expired." />
		</div>
	{/if}
</article>
