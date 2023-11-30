<script lang="ts">
	import ChatBox from '$lib/components/ChatBox.svelte';
	import { journal, pageTitle, state } from '$lib/stores';
	import {  afterUpdate, onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import type { DreamJournal } from '$lib/types.js';
	import { Journal, getChatContext } from '$lib';

	export let data;
	const { messages, setMessages } = getChatContext();

	function removeRedundantMessages() {
		const filteredMessages = $journal.messageList.filter((item) => {
			if (item.name == 'Cover Image updated') return false;
			if (item.content == '_' || !item.content) return false;
			return true;
		});

		Journal.update({ messageList: filteredMessages });
	}

	function setJournal() {
		const journals: DreamJournal[] = JSON.parse(localStorage.getItem('journals') || '[]');
		const foundConversation = journals.find((item) => item.id == data?.id);
		if (foundConversation) journal.set(foundConversation);
		else {
			const newConversation = Journal.create('My Dream Journal', data?.id);
			journal.set(newConversation);
			Journal.save();
		}
	}

	let component: ConstructorOfATypedSvelteComponent;

	afterUpdate(async () => {
		switch ($state) {
			case 'INTERPRETING':
            case "STORY_PUBLISHED":
				component = (await import('$lib/components/journal/DreamInterpreter.svelte')).default
				break;
			case 'CONVERSATION_OVER':
				component = (await import('$lib/components/journal/StoryGenerator.svelte')).default
				break;
            case 'GENERATING_CHAPTER_STORY':
                component = (await import("$lib/components/journal/ChapterStoryGenerator.svelte")).default
                break;
            case 'FINALISING_STORY':
                component = (await import("$lib/components/journal/FinalStory.svelte")).default
                break;
            default:
                component = (await import("$lib/components/journal/DreamInterpreter.svelte")).default
                break;
		}
	});

	onMount(() => {
		setJournal();
		removeRedundantMessages();
		setMessages($journal?.messageList);
		state.set($journal.lastState);

		messages.subscribe((val) => {
			if (val.length >= $journal.messageList.length) {
				Journal.update({ messageList: val });
			}
		});
	});

	afterUpdate(() => {
		pageTitle.set($journal.story.title || 'Dream Journal');
	});

	afterNavigate(() => {
		setJournal();
		removeRedundantMessages();
		setMessages($journal?.messageList);
		state.set($journal.lastState);
	});
</script>

<div class="flex flex-col h-[calc(100dvh-2rem)] md:h-[calc(100dvh-5rem)] overflow-scroll md:pl-2">
    <ChatBox />
    <svelte:component this={component} />
</div>
