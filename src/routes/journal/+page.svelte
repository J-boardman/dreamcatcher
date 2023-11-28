<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { Journal, randomID } from '$lib';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { DreamJournal } from '$lib/types';
	import { journal } from '$lib/stores';

	let allJournals: DreamJournal[] = [];

	onMount(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	afterNavigate(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	function handleNewConversation() {
		const newConversation = Journal.create(newDreamName);
		goto(`/journal/${newConversation.id}`);
		newDreamName = '';
	}

	function handleDelete(id: string) {
		Journal.remove(id);
		allJournals = allJournals.filter((item) => item.id != id);
	}

	let newDreamName = '';
</script>

<section class="m-2 mx-4">
	<article class="join flex">
		<input type="text" class="input join-item" bind:value={newDreamName} />
		<button on:click={handleNewConversation} class="btn join-item">Add</button>
	</article>
	<div class="divider" />

	<section class="grid auto-rows-max lg:grid-cols-3 xl:grid-cols-5 gap-4">
		{#each [...allJournals] as journal, i}
			<!-- <section class="collapse collapse-plus bg-base-300 my-2 h-min">
				<input type="radio" name="my-accordion-3" />
				<article class="collapse-title text-xl font-medium flex gap-4 items-center">
					{journal.name}
				</article>
				<article class="grid grid-cols-2 md:flex items-center gap-2 m-4">
					<a href="/journal/{journal.id}" class="btn btn-sm btn-secondary">Continue</a>
					<button
						on:click={() => handleDelete(journal.id)}
						class="btn btn-sm btn-outline btn-error"
					>
						Delete
					</button>
					<div class="badge badge-lg badge-secondary badge-outline col-span-2 w-full md:w-fit">
						Updated:
						{Intl.DateTimeFormat('en-au', { dateStyle: 'medium' }).format(
							new Date(journal.lastUpdated)
						)}
					</div>
				</article>
				<div class="collapse-content gap-4">
					<Title title={journal.story.title} />
					{#if journal.imageUrl}
						<div class="divider divider-horizontal" />
						<img
							src={journal.imageUrl}
							alt="cover"
							class="rounded-xl my-2"
							on:error={() => (journal.imageUrl = '')}
						/>
					{/if}
				</div>
			</section> -->
			<div class="card card-compact bg-base-300 justify-between shadow-xl">
				<figure class="flex-1">
					{#if journal.imageUrl}
						<img
							src={journal.imageUrl}
							alt="cover"
							on:error={() => (journal.imageUrl = '')}
                            class="h-full"
						/>
					{:else}
						<ImagePlaceholder />
					{/if}
				</figure>
				<div class="card-body flex-grow-0">
					<h2 class="card-title">
						<Title title={journal.story.title || journal.name + ' Journal'} />
					</h2>
					<p class="">
						Last Updated: {Intl.DateTimeFormat('en-au', { dateStyle: 'long' }).format(
							new Date(journal.lastUpdated)
						)}
					</p>
					<div class="card-actions justify-end">
						<a href="/journal/{journal.id}" class="btn btn-sm btn-secondary">Continue</a>
						<button
							on:click={() => handleDelete(journal.id)}
							class="btn btn-sm btn-outline btn-error"
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		{/each}
	</section>
</section>
