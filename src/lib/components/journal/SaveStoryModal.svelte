<script lang="ts">
	import type { NewStory } from '$lib/db/schema/stories';
	import { handleFetch } from '$lib/helpers/handleFetch';
	import { fetching, journal } from '$lib/stores';
	import { clerk } from 'clerk-sveltekit/client';
	import Title from '../Title.svelte';
	import Modal from '../ui/Modal.svelte';
	import { storyPublished, updateJournal } from '$lib/helpers/journal';
	import { goto } from '$app/navigation';
	import ImagePlaceholder from '../ImagePlaceholder.svelte';
   
	import Icon from '@iconify/svelte';
	$: sharing = $journal?.shared;
	let saving = false;

	async function finaliseStory() {
		saving = true;
		if (!$journal.image.url) return;
		const [uploadedImage, error] = await handleFetch('/api/image/upload', {
			method: 'POST',
			body: { url: $journal.image.url }
		});

		if (error) {
			console.log(error);
			return;
		}

		const story: NewStory = {
			authorId: $clerk?.user?.id as string,
			title: $journal.story.title,
			story: $journal.story.story,
			imageUrl: uploadedImage.url,
			// imageUrl: $journal.finalImageUrl,
			shared: sharing
		};

		saving = false;
		const data = await fetch('/api/stories', {
			method: 'POST',
			body: JSON.stringify(story),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const storyID = await data.json();

		storyPublished(storyID);

		updateJournal({
			id: `${storyID}`,
			finalImageUrl: uploadedImage.url,
			lastState: 'STORY_PUBLISHED',
			shared: sharing
		});
		goto(`/story/${storyID}`, { replaceState: true });
	}
</script>

<Modal buttonText="" noAnimate busy={$fetching || !$journal.story.title}>
    <Icon icon={"bi:save"} slot="logo"/>
    <span class="hidden md:flex" slot="button-text">Save Story</span>
	<div class="flex items-center gap-3" slot="title">
		<div class="avatar">
			<div class="mask mask-squircle w-24 h-24">
				{#if $journal?.image?.url}
					<img
						src={$journal?.image?.url}
						alt="cover"
						on:error={() => updateJournal({ image: { ...$journal.image, url: '' } })}
					/>
				{:else}
					<ImagePlaceholder message="" />
				{/if}
			</div>
		</div>
		<div>
			<div class="text-lg opacity-50">Saving the story:</div>
			<Title title={$journal.story.title} fontSize="text-2xl" fontColor="text-success" />
		</div>
	</div>

	<section class="gap-2 pb-4 max-w-full">
		<article class="my-2 max-h-80 overflow-scroll">
			{#each $journal.story.story.split('\n') as paragraph, i}
				<p class="py-1">{paragraph}</p>
			{/each}
		</article>
		<div class="divider divider-neutral mt-2" />
		<p class="italic opacity-80">
			<span class="font-bold text-success">Note:</span> Your conversation history with the dream interpreter
			will remain stored on your device only.
		</p>
		<div class="flex items-end justify-between">
			<label for="share" class="flex items-center gap-4 cursor-pointer label">
				<input
					type="checkbox"
					name="share"
					id="share"
					class="toggle toggle-success"
					checked={sharing}
					on:click={() => (sharing = !sharing)}
					disabled={!$journal.story.title || !$journal?.image?.url}
				/>
				Share story
			</label>
			<form method="dialog">
				<button disabled={saving} on:click={finaliseStory} class="btn btn-success">Save</button>
			</form>
		</div>
	</section>
</Modal>
