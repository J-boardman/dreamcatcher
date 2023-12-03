<script lang="ts">
	import { imageSpecifications, imagePromptMessage } from '$lib/helpers/prompts';
	import { journal, state } from '$lib/stores';
	import Modal from '../ui/Modal.svelte';

	import RefreshLogo from 'virtual:icons/charm/refresh';
	import ImageLogo from 'virtual:icons/ph/image';
	import SaveLogo from 'virtual:icons/bi/save';
	import Title from '../Title.svelte';
	import ImagePlaceholder from '../ImagePlaceholder.svelte';
	import {
		generateImagePrompt,
		getChatContext,
		handleChatRequest,
		handleFetch,
		updateJournal
	} from '$lib';

	const { messages, setMessages } = getChatContext();

	let generatingImage = false;
	let generatingTitle = false;
	$: isLoading = generatingTitle || generatingImage;

	async function handleImageGeneration() {
		const { mood, setting } = $journal.story;
		generatingImage = true;
		const prompt = await generateImagePrompt($messages, mood, setting);

		if (!prompt) {
			console.warn(prompt);
			return;
		}

		const [data, error] = await handleFetch('/api/image', {
			method: 'POST',
			body: { prompt: imageSpecifications + ' ' + prompt }
		});

		generatingImage = false;

		if (error || !data.url) {
			console.warn(error);
			console.log('error triggered !!!!!!!!!!!!');
			return;
		}

		setMessages([
			...$messages,
			{
				id: data.created,
				content: data.url,
				name: 'image',
				role: 'system'
			}
		]);
		updateJournal({ image: { url: data.url, created: data.created } });
	}

	async function handleTitleGeneration() {
		generatingTitle = true;
		const [data, error] = await handleChatRequest(
			'Generate a short 3-5 word title for the story.',
			$messages
		);

		if (error) {
			console.warn(error);
			return;
		}

		const title = data?.choices[0].message.content?.replaceAll('"', '');

		updateJournal({ story: { ...$journal.story, title: title as string } });
		generatingTitle = false;
	}

	function handleTitleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		updateJournal({ story: { ...$journal.story, title: target.value } });
	}

	$: sharing = $journal?.shared;
	let saving = false;

	async function finaliseStory() {
		saving = true;
		updateJournal({ shared: sharing });
		if (!$journal.image.url) return;
		const [uploadedImage, error] = await handleFetch('/api/image/upload', {
			method: 'POST',
			body: { url: $journal.image.url }
		});

		if (error) {
			console.log(error);
			return;
		}
		//@ts-ignore
		console.log(uploadedImage.url);
		// @ts-ignore
		updateJournal({ finalImageUrl: uploadedImage.url, lastState: 'STORY_PUBLISHED' });
		console.log('done!');
		saving = false;
	}
</script>

{#if $state == 'FINALISING_STORY'}
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
	</section>
{/if}
