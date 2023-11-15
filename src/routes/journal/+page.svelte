<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { afterUpdate, onMount } from 'svelte';

	import Chatbox from '$lib/components/ChatBox.svelte';
	import StoryGenerator from '$lib/components/journal/StoryGenerator.svelte';
	import ChapterStoryGenerator from '$lib/components/journal/ChapterStoryGenerator.svelte';
	import FinalStory from '$lib/components/journal/FinalStory.svelte';
	import DreamInterpreter from '$lib/components/journal/DreamInterpreter.svelte';

	import { state, dreamJournals, currentJournalID } from '$lib/stores';
	import { afterNavigate } from '$app/navigation';
	import { journal } from '$lib/journals';

	onMount(() => {
		messages.subscribe((val) => {
			const currentConversation = journal.getByID($currentJournalID)
			if (!currentConversation || val.length < currentConversation.messageList.length) return;
			currentConversation.messageList = val;
			journal.save();
		});

		state.subscribe((val) => {
            console.log(val)
			if (!$currentJournalID) return;
			journal.updateByID($currentJournalID, { lastState: val });
		});

        dreamJournals.subscribe(val => {
          const currentConversation = journal.getByID($currentJournalID);
          if(!currentConversation) $messages = []
        })

		updateMessages();
	});

	afterUpdate(() => {
		updateMessages();
	});

	afterNavigate(() => {
		journal.refreshID();
		dreamJournals.set(journal.load());
		updateMessages();
	});

	function updateMessages() {
		const foundConversation = journal.getByID($currentJournalID);
		if (!foundConversation) return;
		$messages = foundConversation.messageList;
	}

	const { input, handleSubmit, messages, isLoading, append } = useChat({
		initialMessages: $dreamJournals.find((item) => item.id == $currentJournalID)?.messageList
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
		if (!$currentJournalID) return;
		journal.updateByID($currentJournalID, { lastState: 'FINALISING_STORY' });
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
