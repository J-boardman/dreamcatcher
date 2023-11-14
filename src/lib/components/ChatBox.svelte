<script lang="ts">
	import { state } from '$lib/stores';
	import type { Message } from 'ai';
	import { afterUpdate } from 'svelte';
	import type { Readable } from 'svelte/store';
	import ConversationList from './journal/ConversationList.svelte';

	export let messages: Readable<Message[]>;
	let element: HTMLElement;

	async function scrollToBottom(node: HTMLElement) {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	}
	afterUpdate(() => {
        if(element) scrollToBottom(element)
    });
</script>

{#if $state != "FINALISING_STORY"}
	<section
		class="overflow-scroll border-2 rounded-xl border-base-100 flex min-h-[220px] flex-col justify-end p-2 text-sm md:text-base flex-1 duration-150"
	>
        <ConversationList />
		<section bind:this={element} class="overflow-scroll">
			{#each $messages as message, i}
				{#if message.role == 'system'}
					{#if message.name != 'hidden message'}
						<div class="divider"><span class="opacity-50 uppercase">{message.name}</span></div>
					{/if}
				{:else}
					<article class="chat {message.role == 'user' ? 'chat-end' : 'chat-start'} w-full">
						<div class="chat-bubble chat-bubble-{message.role == 'user' ? 'secondary' : ''}">
							{#each message.content.split('\n') as paragraph}
								<p class="my-2">{paragraph}</p>
							{/each}
						</div>
					</article>
				{/if}
			{/each}
		</section>
	</section>
{/if}
