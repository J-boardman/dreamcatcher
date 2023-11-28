<script lang="ts">
	import ChatBox from '$lib/components/ChatBox.svelte';
	import { journal, pageTitle, state } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	import DreamInterpreter from '$lib/components/journal/DreamInterpreter.svelte';
	import { afterNavigate } from '$app/navigation';
	import StoryGenerator from '$lib/components/journal/StoryGenerator.svelte';
	import FinalStory from '$lib/components/journal/FinalStory.svelte';
	import ChapterStoryGenerator from '$lib/components/journal/ChapterStoryGenerator.svelte';
	import type { DreamJournal } from '$lib/types.js';
	import { Journal, getChatContext } from '$lib';

	export let data;
    const { messages, setMessages } = getChatContext()

	onMount(() => {
		const conversations: DreamJournal[] = JSON.parse(localStorage.getItem('journals') || '[]');
		const foundConversation = conversations.find((item) => item.id == data?.id);

		if (foundConversation) journal.set(foundConversation);
		else {
			const newConversation = Journal.create('My Dream Journal', data?.id);
			journal.set(newConversation);
			Journal.save();
		}

		setMessages($journal?.messageList);
		state.set($journal.lastState);

		messages.subscribe((val) => {
			if (val.length >= $journal.messageList.length) {
				Journal.update({ messageList: val }, true);
			}
		});
	});

	afterUpdate(() => {
		pageTitle.set($journal.story.title || 'Dream Journal');
	});

	afterNavigate(() => {
		const newJournal: DreamJournal[] = JSON.parse(localStorage.getItem('journals') || '[]');
		journal.set(
			newJournal.find((item) => item.id == data.id) || Journal.create('Dream Journal', data?.id)
		);
		setMessages($journal?.messageList);
		state.set($journal.lastState);
	});
</script>

<div class="flex flex-col h-[calc(100dvh-2rem)] md:h-[calc(100dvh-5rem)] overflow-scroll md:pl-2">
	<ChatBox />
	<DreamInterpreter />
	<StoryGenerator />
	<ChapterStoryGenerator />
	<FinalStory />
</div>
