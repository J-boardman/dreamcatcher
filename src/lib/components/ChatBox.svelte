<script lang="ts">
	import { Journal, getChatContext, randomID } from '$lib';
	import { journal } from '$lib/stores';
	import { afterUpdate } from 'svelte';
	import ImagePlaceholder from './ImagePlaceholder.svelte';

	let element: HTMLElement;

    const { messages } = getChatContext()
    
	afterUpdate(() => {
        if (!element) return;
        element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
	});
</script>

<section
	class="border-2 rounded-lg border-base-100 flex min-h-[220px] flex-col justify-end text-sm md:text-base flex-1"
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
				<div class="divider"><span class="opacity-50 uppercase">Cover Image</span></div>
				<article class="chat chat-start">
					{#if message.content}
						<button
							on:click={() => {
								if (message.content == $journal.imageUrl) return;
								Journal.update({ imageUrl: message.content }, true);
								$messages = [
									...$messages,
									{ role: 'system', id: randomID(), name: 'Cover Image updated', content: '' }
								];
							}}
							class="chat-bubble py-4 {message.content == $journal.imageUrl
								? 'bg-secondary'
								: 'bg-base-300'}"
						>
							<img
								src={message.content}
								alt="cover"
								on:error={() => (message.content = '')}
								class="w-96 rounded-xl"
							/>
						</button>
					{:else}
						<div class="w-64 md:w-96 chat-bubble bg-base-300">
							<ImagePlaceholder message="image expired." />
						</div>
					{/if}
				</article>
			{:else if message.name != 'hidden message'}
				<div class="divider"><span class="opacity-50 uppercase">{message.name}</span></div>
			{/if}
		{/each}
	</section>
</section>
