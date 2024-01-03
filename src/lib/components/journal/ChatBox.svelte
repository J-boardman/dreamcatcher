<script lang="ts">
	import { journal } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import ChatImage from '$lib/components/journal/ChatImage.svelte';
	import { getChatContext } from '$lib';
	import { clerk } from 'clerk-sveltekit/client';
	import MoonIcon from 'virtual:icons/line-md/moon-loop';
	import { updateJournal } from '$lib/helpers/journal';

	let element: HTMLElement;
	let messageListLength = 0;
	const { messages } = getChatContext();

	const scrollToBottom = () => element?.scroll({ top: element.scrollHeight, behavior: 'smooth' });

	function formatDate(date: Date | undefined) {
		try {
			return Intl.DateTimeFormat('en-au', { dateStyle: 'long' }).format(date);
		} catch (error) {
			return '';
		}
	}

	$: userName = $clerk?.user?.firstName || '@' + $clerk?.user?.username || 'You';

	afterUpdate(() => {
		if ((messageListLength = 0)) scrollToBottom();
		if ($journal?.messageList?.length <= messageListLength) return;
		scrollToBottom();
		messageListLength = $journal?.messageList?.length;
	});

	afterNavigate(() => {
		updateJournal({
			messageList: $journal.messageList.filter((item) => item.name != 'Cover Image updated')
		});
	});
</script>

<section
	class="border-2 rounded-lg border-base-100 flex min-h-[220px] flex-1 flex-col justify-end text-sm md:text-base join-item"
>
	<section bind:this={element} class="overflow-scroll">
		{#each $messages as message, i}
			{#if message.role != 'system'}
				<article class=" chat {message.role == 'user' ? 'chat-end ml-2' : 'chat-start mr-2'}">
					<div class="hidden md:flex chat-image avatar">
						<div class="w-10 rounded-full flex items-center justify-center">
							{#if message.role == 'user'}
								<img alt="Tailwind CSS chat bubble component" src={$clerk?.user?.imageUrl} />
							{:else}
								<MoonIcon class="text-2xl md:text-3xl ml-2" />
							{/if}
						</div>
					</div>
                    
					<div class="chat-bubble bg-base-300 max-w-[90ch]">
                        <div class="flex gap-2 items-center">
                            <p class="font-bold">{message.role == 'user' ? userName : 'Dreamcatcher'}</p>
                            <time class="text-xs opacity-50">{formatDate(message.createdAt)}</time>
                        </div>
                        <div class="divider divider-neutral my-0"></div>
						{#each message.content.split('\n') as paragraph}
							<p class="my-2">{paragraph}</p>
						{/each}
					</div>
				</article>
			{:else if message.name == 'image'}
				<ChatImage {message} />
			{:else if message.name != 'hidden message'}
				<div class="divider mx-2"><span class="opacity-50 uppercase">{message.name}</span></div>
			{/if}
		{/each}
	</section>
</section>
