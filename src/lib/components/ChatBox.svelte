<script lang="ts">
	import { Journal, getChatContext, randomID } from '$lib';
	import { journal } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import ChatImage from '$lib/components/ChatImage.svelte';

	let element: HTMLElement;
	let messageListLength = 0;
	const { messages } = getChatContext();

	const scrollToBottom = () => element?.scroll({ top: element.scrollHeight, behavior: 'smooth' });

	afterUpdate(() => {
		if ((messageListLength = 0)) scrollToBottom();
		if ($journal?.messageList?.length <= messageListLength) return;
		scrollToBottom();
		messageListLength = $journal?.messageList?.length;
	});

	afterNavigate(() => {
		Journal.update({
			messageList: $journal.messageList.filter((item) => item.name != 'Cover Image updated')
		});
	});
</script>

<section
	class="border-2 rounded-lg border-base-100 flex min-h-[220px] flex-col justify-end text-sm md:text-base flex-1 join-item"
>
	<section bind:this={element} class="overflow-scroll">
		{#each $messages as message, i}
			{#if message.role != 'system'}
				<article class=" chat {message.role == 'user' ? 'chat-end ml-2' : 'chat-start mr-2'}">
					<div class="chat-bubble bg-base-300 max-w-[90ch]">
						{#each message.content.split('\n') as paragraph}
							<p class="my-2">{paragraph}</p>
						{/each}
					</div>
				</article>
			{:else if message.name == 'image'}
				<ChatImage {message} />
			{:else if message.name != 'hidden message'}
				<div class="divider"><span class="opacity-50 uppercase">{message.name}</span></div>
			{/if}
		{/each}
	</section>
</section>
