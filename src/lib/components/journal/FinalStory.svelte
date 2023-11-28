<script lang="ts">
	import { Journal, getChatContext, randomID } from '$lib';
	import { imagePrompt, imagePromptMessage } from '$lib/prompts/prompts';
	import { journal, state } from '$lib/stores';
	import type { ChatCompletion } from 'openai/resources';
	import Modal from '../Modal.svelte';

	import RefreshLogo from 'virtual:icons/charm/refresh';
	import ImageLogo from 'virtual:icons/ph/image';
	import SaveLogo from 'virtual:icons/bi/save';
	import Title from '../Title.svelte';
	import ImagePlaceholder from '../ImagePlaceholder.svelte';

	const { messages, setMessages } = getChatContext();

	let generatingImage = false;
	let generatingTitle = false;
	$: isLoading = generatingTitle || generatingImage;

	async function handleImageGeneration() {
		// const initialImagePrompt = appendSystemMessage(imagePromptMessage, 'hidden message');
		generatingImage = true;
		const prompt = await fetch('/api/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				messages: [...$messages, { content: imagePromptMessage, role: 'user', id: '001' }],
				streaming: false
			})
		});
		const data2: ChatCompletion = await prompt.json();
		const response = data2.choices[0].message.content;
		// return;

		const data = await fetch('/api/image', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				prompt: `${imagePrompt($journal.story.mood, $journal.story.setting) + response}`
			})
		});

		const img = await data.json();
		generatingImage = false;

		if (!img.url) return;

		setMessages([
			...$messages,
			{
				id: randomID(),
				content: img.url,
				name: 'image',
				role: 'system'
			}
		]);

		Journal.update({ imageUrl: img.url }, true);
	}

	async function handleTitleGeneration() {
		generatingTitle = true;
		const response = await fetch(`/api/chat`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				messages: [
					...$messages,
					{ role: 'user', content: 'Generate a short 3 - 5 word title for the story.' }
				],
				streaming: false
			})
		});

		const data: ChatCompletion = await response.json();
		generatingTitle = false;
		const title = data.choices[0].message.content?.replaceAll('"', '');

		Journal.updateStory({ title: title as string }, true);
	}

	function handleTitleChange(e: Event) {
		const target = e.target as HTMLInputElement;

		Journal.updateStory({ title: target.value }, true);
	}

	$: sharing = $journal?.shared;

	function finaliseStory() {
		Journal.update({ shared: sharing }, true);
	}
</script>

{#if $state == 'STORY_GENERATION_FINISHED'}
	<section class="grid md:grid-cols-5 gap-2 pt-4 sm:pb-1">
		<article class="join flex col-span-3">
			<input
				bind:value={$journal.story.title}
				on:change={handleTitleChange}
				type="text"
				class="join-item input flex-1"
				disabled={generatingTitle}
			/>
			<button
				disabled={generatingTitle}
				on:click={handleTitleGeneration}
				class="btn join-item animate-none"
			>
				<RefreshLogo />
				<span class="hidden md:flex">Generate Title</span>
			</button>
		</article>
		<button disabled={generatingImage} on:click={handleImageGeneration} class="btn animate-none">
			<ImageLogo class="text-lg" />
			<span class="">New Image</span>
		</button>

		<Modal buttonText={'Save story'} noAnimate busy={isLoading}>
			<span slot="logo"><SaveLogo /></span>

			<section class="gap-2 py-4 max-w-full">
				<div class="flex items-center gap-3">
					<div class="avatar">
						<div class="mask mask-squircle w-24 h-24">
							{#if $journal.imageUrl}
								<img
									src={$journal.imageUrl}
									alt="cover"
									on:error={() => Journal.update({ imageUrl: '' }, true)}
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
				<article class="my-2 max-h-80 overflow-scroll">
					{#each $journal.story.story.split('\n') as paragraph, i}
						<p class="py-1">{paragraph}</p>
					{/each}
				</article>
				<div class="divider divider-neutral mt-2" />
				<p class="italic opacity-80">
					<span class="font-bold text-success">Note:</span> Your conversation history with the dream
					interpreter will remain stored on your device only.
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
							disabled={!$journal.story.title || !$journal.imageUrl}
						/>
						Share story
					</label>
					<form method="dialog">
						<button on:click={finaliseStory} class="btn btn-success">Save</button>
					</form>
				</div>
			</section>
		</Modal>
	</section>
{/if}
