<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { Journal, type DreamJournal, journal } from '$lib/Journals';
	import ImagePlaceholder from '$lib/components/ImagePlaceholder.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { State } from '$lib/stores';
	import { onMount } from 'svelte';
	import DeleteIcon from 'virtual:icons/line-md/close-circle';

	let allJournals: DreamJournal[] = [];

	onMount(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	afterNavigate(() => {
		allJournals = JSON.parse(localStorage?.getItem('journals') || '[]');
	});

	const changeConversation = (id: string, state?: State) => {
		if (!state) {
			if (!journal || !$journal.lastState) return;
			goto(`/journal/${id}`);
		} else {
			goto(`/journal/${id}`);
		}
	};

	function handleNewConversation() {
		const newConversation = Journal.create(
			Math.random().toString(36).substring(2, 9),
			newDreamName
		);
		changeConversation(newConversation.id, 'INTERPRETING');
		newDreamName = '';
	}

	function handleDelete(id: string) {
		Journal.remove(id);
		allJournals = allJournals.filter((item) => item.id != id);
	}

	function sortJournals(e: Event) {
		const target = e.target as HTMLSelectElement;
		switch (target.value) {
			case 'newest':
				allJournals = allJournals.sort((a, b) => {
					return new Date(b.lastUpdated).getDate() - new Date(a.lastUpdated).getDate();
				});
				break;
			case 'oldest':
				allJournals = allJournals.sort((a, b) => {
					return new Date(a.lastUpdated).getDate() - new Date(b.lastUpdated).getDate();
				});
				break;
		}
	}

	let newDreamName = '';
</script>

<section class="m-2 mx-4">
	<article class="join flex">
		<input type="text" class="input join-item flex-1" bind:value={newDreamName} />
		<button on:click={handleNewConversation} class="btn join-item">Add</button>
	</article>
	<div class="divider" />
	{#each allJournals as journal, i}
		<div class="collapse collapse-plus bg-base-300 my-2">
			<input type="radio" name="my-accordion-3" />
			<div class="collapse-title text-xl font-medium flex gap-4 items-center">
				{journal.name}
				<div class="hidden gap-2 md:flex">
					<div class="badge badge-secondary badge-outline">{journal.lastState}</div>
					<div class="badge badge-primary badge-outline">
						{Intl.DateTimeFormat('en-au', { dateStyle: 'long' }).format(
							new Date(journal.lastUpdated)
						)}
					</div>
				</div>
			</div>
			<div class="collapse-content flex flex-col gap-4">
				<div class="flex gap-2 md:hidden">
					<div class="badge badge-secondary badge-outline">{journal.lastState}</div>
					<div class="badge badge-primary badge-outline">
						{Intl.DateTimeFormat('en-au', { dateStyle: 'long' }).format(
							new Date(journal.lastUpdated)
						)}
					</div>
				</div>
				{#if journal.lastState == 'FINALISING_STORY'}
					<article class="grid md:grid-cols-[1fr,_5fr] gap-4">
						{#if journal.story.imageUrl}
							<img
								src={journal.story.imageUrl}
								alt="cover"
								class="rounded-xl"
								on:error={() => (journal.story.imageUrl = '')}
							/>
						{:else}
							<ImagePlaceholder />
						{/if}
						<article class="flex flex-col justify-between">
							<Title title={journal.story.title} />
							<div class="divider my-0" />
							{#each journal.story.story.substring(0, 2000).concat('...').split('\n') as paragraph}
								<p class="hidden md:block my-1">{paragraph}</p>
							{/each}
							<article class="flex gap-2 mt-4 md:mt-auto">
								<a href="/journal/{journal.id}" class="btn btn-sm btn-secondary">Continue</a>
								<button on:click={() => handleDelete(journal.id)} class="btn btn-sm btn-ghost"
									>Delete</button
								>
							</article>
						</article>
					</article>
				{:else}
					<article class="flex gap-2 mt-auto">
						<a href="/journal/{journal.id}" class="btn btn-sm btn-secondary">Continue</a>
						<button on:click={() => handleDelete(journal.id)} class="btn btn-sm btn-ghost"
							>Delete</button
						>
					</article>
				{/if}
			</div>
		</div>
	{/each}
</section>
