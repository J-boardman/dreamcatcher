<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { afterUpdate, onMount } from 'svelte';

	import Chatbox from '$lib/components/ChatBox.svelte';
	import StoryGenerator from '$lib/components/journal/StoryGenerator.svelte';
	import ChapterStoryGenerator from '../../lib/components/journal/ChapterStoryGenerator.svelte';
	import FinalStory from '$lib/components/journal/FinalStory.svelte';
	import DreamInterpreter from '$lib/components/journal/DreamInterpreter.svelte';

	import { afterNavigate } from '$app/navigation';
	import { state } from '$lib/stores';
	import { Journal, currentJournal } from '$lib/Journals';

	afterUpdate(() => {
		if (!$messages.length && $currentJournal) setMessages($currentJournal.messageList);
	});

	afterNavigate(() => {
		if (Journal) {
			// Journal?.refresh();
		}
		setMessages($currentJournal?.messageList);
	});

	const { setMessages, input, handleSubmit, messages, isLoading, append } = useChat({
		onFinish() {
			Journal.update({ messageList: $messages }, true);
		}
	});

	async function appendSystemMessage(content: string, name: string) {
		await append({
			role: 'system',
			id: Math.random().toString(36).substring(2, 9),
			content,
			name
		});
		return $messages.at(-1)?.content;
	}

	function finaliseStory() {
		state.set('FINALISING_STORY');
	}
</script>

<FinalStory {appendSystemMessage} {isLoading} {messages} />
{#if $state != 'FINALISING_STORY'}
	<div class="flex flex-col h-[calc(100svh-1rem)] md:h-[calc(100svh-6rem)]">
		<Chatbox {messages} />
		<DreamInterpreter {input} {isLoading} {messages} {appendSystemMessage} {handleSubmit} />
		<StoryGenerator {isLoading} {appendSystemMessage} {messages} />
		<ChapterStoryGenerator {isLoading} {appendSystemMessage} {messages} />
		{#if $state == 'STORY_GENERATION_FINISHED'}
			<div class="divider">
				<span class="opacity-50 uppercase">Take your time reading</span>
			</div>
			<button on:click={finaliseStory} class="btn mx-auto"> Confirm story </button>
		{/if}
	</div>
{/if}
