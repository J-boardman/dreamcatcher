<script lang="ts">
	import { afterUpdate } from "svelte";

	let comment = '';
	export let comments: string[];

	async function handleComment(e: SubmitEvent) {
		const target = e.target as HTMLFormElement;
		e.preventDefault();
		target.reset();
		comments = [...comments, comment];
	}

	let element: HTMLElement;

	async function scrollToBottom(node: HTMLElement) {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	}

	afterUpdate(() => {
		if (element) scrollToBottom(element);
	});
</script>

<div class="flex flex-col overflow-scroll">
    <form on:submit={handleComment} class="join flex justify-center">
        <input
            bind:value={comment}
            type="text"
            class="input join-item flex-1 w-64 md:w-max"
            placeholder="Leave a comment..."
            required
        />
        <button class="btn join-item no-animation">Comment</button>
    </form>
	<section bind:this={element}>
		{#each comments as comment}
			<div class="mt-2 flex">
				<div class="flex-1">
					Obi-Wan Kenobi
					<time class="text-xs opacity-50">2 hours ago</time>
					<div class="chat-bubble bg-base-300">
						{#each comment.split('\n') as paragraph}
							<p class="my-2">{comment}</p>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</section>
</div>
