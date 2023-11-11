<script lang="ts">
	export let data;
	import cover from '$lib/assets/nice.png';
	import Title from '$lib/components/Title.svelte';
	import { pageTitle } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';

	onMount(() => {
		pageTitle.set(data.title);
	});

	let comment = '';
	async function handleComment(e: SubmitEvent) {
		const target = e.target as HTMLFormElement;
		e.preventDefault();
		target.reset();
		// data.comments = [...data.comments, comment];
	}

	let element: HTMLElement;

	async function scrollToBottom(node: HTMLElement) {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	}

	afterUpdate(() => scrollToBottom(element));
</script>

<main class="grid md:grid-cols-[1fr,_2.25fr] gap-2">
	<a href="/story/{data.id}/cover">
		<img
			src={cover}
			alt="cover"
			class="h-min md:sticky top-0 w-9/12 sm:w-7/12 md:w-[96%] md:mt-0 mt-4 mx-auto"
			style="view-transition-name: testing-{data.id};"
		/>
	</a>
	<section class="m-2 flex flex-col gap-2">
		<div class="md:hidden text-center">
			<Title title={data.title} />
		</div>
		<div class="md:hidden divider my-0" />
		<section class="flex gap-4 mx-2 items-center">
			<SignedIn let:user>
				<div class="flex flex-1 items-center space-x-3">
					<div class="avatar">
						<div class="mask mask-squircle w-12 h-12">
							<img src={user?.imageUrl} alt="profile" />
							<img src="/" alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
					<div class="hidden sm:flex flex-col">
						<div class="font-bold">{user?.firstName} {user?.lastName}</div>
						<div class="text-sm opacity-50">@{user?.username}</div>
					</div>
				</div>
			</SignedIn>
			<button class="btn btn-sm sm:btn-md">Like</button>
			<div class="join">
				<button
					on:click={() => (data.comments = null)}
					class="join-item btn btn-sm sm:btn-md {data.comments == null ? 'btn-secondary' : ''}"
					>Story</button
				>
				<button
					on:click={() => (data.comments = ['LOL'])}
					class="join-item btn btn-sm sm:btn-md {data.comments != null ? 'btn-secondary' : ''}"
					>Comments</button
				>
			</div>
		</section>
		<div class="divider my-0" />
		{#if data.comments == null}
			<article class="flex flex-col gap-2">
				{#each data.story.split('\n') as paragraph}
					<p>{paragraph}</p>
				{/each}
				{#each data.story.split('\n') as paragraph}
					<p>{paragraph}</p>
				{/each}
			</article>
		{:else}
			<form on:submit={handleComment} class="join flex m-1">
				<input bind:value={comment} type="text" class="input join-item flex-1" placeholder="Leave a comment..." required />
				<button class="btn join-item">Comment</button>
			</form>
			<div class="flex flex-col h-[calc(100svh-4rem)] md:h-[calc(100svh-11rem)] overflow-scroll">
				<section bind:this={element} class="flex-1 overflow-scroll">
					{#each data.comments as comment}
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
		{/if}
	</section>
</main>
