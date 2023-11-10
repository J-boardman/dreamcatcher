<script lang="ts">
	import { afterUpdate } from 'svelte';

	export let messages;
	let element: HTMLElement;

	async function scrollToBottom(node: HTMLElement) {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	}

	afterUpdate(() => scrollToBottom(element));
</script>

<section
	class="overflow-scroll border-2 rounded-xl border-base-100 flex min-h-[220px] flex-col justify-end p-2 text-sm md:text-base flex-1 duration-150"
>
	<section bind:this={element} class="overflow-scroll">
		{#each $messages as message, i}
			{#if message.name == "generate-story"}
				<div class="divider"><span class="opacity-50 uppercase">Your story</span></div>
			{:else if message.role == 'system'}
				<div class="divider"><span class="opacity-50 uppercase">{message.name}</span></div>
			{:else}
				<article class="chat chat-{message.role == 'user' ? 'end' : 'start'} w-full">
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
