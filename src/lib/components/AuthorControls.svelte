<script lang="ts">
	import type { Story } from '$lib/db/schema/stories';
	import ImagePlaceholder from './ImagePlaceholder.svelte';
	import Title from './Title.svelte';
	import Modal from './ui/Modal.svelte';

	export let story: Story;
    let { id, shared, title, imageUrl} = story
	let deleting = false;
	function handleShareClick() {
		shared = !shared;
	}

	async function handleDelete() {
		deleting = true;
		const data = await fetch(`/api/stories/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const result = await data.json();
		console.log(result);
		deleting = false;
	}
</script>

<a href="/story/{id}/edit" class="btn h-full join-item">Edit</a>
<button on:click={handleShareClick} class="btn h-full join-item">
	{shared ? 'Shared' : 'Share'}
</button>
<Modal classes="h-full rounded-l-none rounded-r-xl " buttonText="Delete">
	<span slot="logo"></span>
	<div class="flex items-center gap-3" slot="title">
		<div class="avatar">
			<div class="mask mask-squircle w-24 h-24">
				{#if imageUrl}
					<img
						src={imageUrl}
						alt="cover"
					/>
				{:else}
					<ImagePlaceholder message="" />
				{/if}
			</div>
		</div>
		<div>
			<div class="text-lg opacity-50">Saving the story:</div>
			<Title title={title} fontSize="text-2xl" fontColor="text-success" />
		</div>
	</div>

	<section class="gap-2 pb-4 max-w-full">
		<article class="my-2 max-h-80 overflow-scroll">
		</article>
		<div class="divider divider-neutral mt-2" />
		<p class="italic opacity-80">
			<span class="font-bold text-success">Note:</span> Your conversation history with the dream interpreter
			will remain stored on your device only.
		</p>
		<div class="flex items-end justify-between">
			<label for="share" class="flex items-center gap-4 cursor-pointer label">
				Share story
			</label>
			<form method="dialog">
                <button disabled={deleting} on:click={handleDelete} class="btn btn-error">Delete</button>
			</form>
		</div>
	</section>
</Modal>
<!-- <button class="btn h-full join-item">Delete</button> -->
