<script lang="ts">
	import type { DreamJournal } from '$lib/types';
	import { CldImage } from 'svelte-cloudinary';
	import Title from '../Title.svelte';
	import { updateJournal } from '$lib/helpers/journal';
	import ImagePlaceholder from '../ImagePlaceholder.svelte';

	export let journal: DreamJournal;
	export let handleDelete: (id: string) => void;

	let element: HTMLElement;
</script>

<div
	bind:this={element}
	class="card card-compact card-side bg-secondary-content shadow-xl duration-300"
>
	<div class="h-full card-body flex flex-col">
		<Title
			title={journal.story.title || journal.name || 'No Title Yet'}
			fontSize="text-xl md:text-2xl"
		/>
		<div class="flex items-center gap-3 mt-auto">
			<div class="avatar">
				<div class="mask mask-squircle w-24 h-24">
					{#if journal.finalImageUrl}
						<CldImage src={journal.finalImageUrl} width={400} height={600} alt="Story cover"/>
					{:else if journal?.image?.url}
						<img
							src={journal?.image?.url}
							alt="cover"
							on:error={() => {
								updateJournal({ image: { ...journal.image, url: '' } });
								journal.image.url = '';
							}}
						/>
					{:else}
						<ImagePlaceholder message="No image" />
					{/if}
				</div>
			</div>
			<div class="grid gap-3">
				<div class="md:text-lg opacity-50">
					<p>
						Last updated: {Intl.DateTimeFormat('en-au', { dateStyle: 'long' }).format(
							new Date(journal?.lastUpdated)
						)}
					</p>
					{#if journal?.created}
						<p>
							Created: {Intl.DateTimeFormat('en-au', { dateStyle: 'long' }).format(
								new Date(journal?.created)
							)}
						</p>
					{/if}
				</div>
				<div class="flex gap-3">
					<a href="/journal/{journal.id}" class="btn btn-secondary btn-sm">Continue</a>
					<button
						on:click={() => {
							handleDelete(journal.id);
						}}
						class="btn btn-error btn-outline btn-sm"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
		<div class="card-actions justify-end" />
	</div>
</div>
