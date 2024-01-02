<script lang="ts">
	import { imageSpecifications } from '$lib/helpers/prompts';
	import { fetching, journal, state } from '$lib/stores';
	import SaveStoryModal from '$lib/components/journal/SaveStoryModal.svelte';
    
	import {
		generateImagePrompt,
		getChatContext,
		handleChatRequest,
		handleFetch,
		randomID,
		updateJournal
	} from '$lib';
	import Icon from '@iconify/svelte';

	const { messages, setMessages } = getChatContext();

	async function handleImageGeneration() {
		const messageID = randomID();
		setMessages([
			...$messages,
			{
				id: messageID,
				content: 'Generating Image',
				name: 'image',
				role: 'system'
			}
		]);
  
		const { mood, setting } = $journal.story;
		fetching.set(true);
		const prompt = await generateImagePrompt($messages, mood, setting);

		if (!prompt) {
			console.warn(prompt);
			return;
		}

		const [data, error] = await handleFetch('/api/image', {
			method: 'POST',
			body: { prompt: imageSpecifications + ' ' + prompt }
		});

		fetching.set(false);

		if (error || !data.url) {
			console.warn(error);
			console.log('error triggered !!!!!!!!!!!!');
			return;
		}

		setMessages(
			$messages.map((item) =>
				item.id == messageID ? { ...item, content: data.url, id: data.created } : item
			)
		);
		updateJournal({ image: { url: data.url, created: data.created } });
	}

	async function handleTitleGeneration() {
		fetching.set(true);
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
		fetching.set(false);
	}

	function handleTitleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		updateJournal({ story: { ...$journal.story, title: target.value } });
	}
</script>

{#if $state == 'FINALISING_STORY'}
	<section class="flex gap-2">
		<article class="flex rounded-xl">
		<input
				bind:value={$journal.story.title}
				on:change={handleTitleChange}
				type="text"
				class="join-item input flex-1 max-w-36 md:max-w-full"
                placeholder="Title"
				disabled={$fetching}
			/>
			<button
				disabled={$fetching}
				on:click={handleTitleGeneration}
				class="btn animate-none rounded-l-none"
			>
                <Icon icon="charm:refresh" class="text-lg" />
				<span class="hidden md:flex">Generate Title</span>
			</button>
		</article>
		<button disabled={$fetching} on:click={handleImageGeneration} class="btn animate-none">
            <Icon icon="ph:image" class="text-lg"/>
			<span class="hidden md:flex">New Image</span>
		</button>
		<SaveStoryModal />
	</section>
{/if}
