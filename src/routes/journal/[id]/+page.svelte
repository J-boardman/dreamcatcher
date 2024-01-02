<script lang="ts">
	import ChatBox from '$lib/components/journal/ChatBox.svelte';
	import { journal, pageTitle, state } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import DreamInterpreter from '$lib/components/journal/JournalChat.svelte';
	import StoryGenerator from '$lib/components/journal/StoryTypeSettings.svelte';
	import FinalStory from '$lib/components/journal/FinalStory.svelte';
	import type { Snapshot } from '@sveltejs/kit';
	import { getChatContext, setJournal, updateJournal } from '$lib';
	import ChapterStoryGenerator from '$lib/components/journal/ChapterStoryGenerator.svelte';
	import BottomActions from '$lib/components/ui/BottomActions.svelte';

	// export let data;
	const { input, messages, setMessages } = getChatContext();

	export const snapshot: Snapshot<string> = {
		capture: () => $input,
		restore: (value) => ($input = value)
	};

	onMount(() => {
		setJournal();
		setMessages($journal?.messageList);
		state.set($journal.lastState);

		messages.subscribe((val) => {
			if (val.length >= $journal.messageList.length) {
				updateJournal({ messageList: val });
			}
		});
	});

	afterUpdate(() => {
		pageTitle.set($journal.story.title || 'Dream Journal');
	});

	afterNavigate(() => {
		setJournal();
		setMessages($journal?.messageList);
		state.set($journal.lastState);
	});
    let component: ConstructorOfATypedSvelteComponent

    import nice from "$lib/components/journal/InterpretationActions.svelte"
	import StoryGeneratorActions from '$lib/components/journal/StoryGenerator.svelte';
    $: {
        switch($state){
            case "INTERPRETING": component = nice; break;
            case "CONVERSATION_OVER": component = StoryGeneratorActions; break;
            case "FINALISING_STORY": component = FinalStory; break;
            case "GENERATING_CHAPTER_STORY": component = ChapterStoryGenerator; break;
        }
    }
</script>

<ChatBox />
<DreamInterpreter />
<StoryGenerator />

<BottomActions journalPage>
    <svelte:component this={component} />
</BottomActions>