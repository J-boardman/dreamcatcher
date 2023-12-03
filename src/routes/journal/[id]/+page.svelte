<script lang="ts">
	import ChatBox from '$lib/components/journal/ChatBox.svelte';
	import { journal, pageTitle, state } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import DreamInterpreter from '$lib/components/journal/DreamInterpreter.svelte';
	import StoryGenerator from '$lib/components/journal/StoryGenerator.svelte';
	import FinalStory from '$lib/components/journal/FinalStory.svelte';
	import type { Snapshot } from '@sveltejs/kit';
	import { getChatContext, setJournal, updateJournal } from '$lib';

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
                updateJournal({ messageList: val})
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
</script>

<ChatBox />
<DreamInterpreter />
<StoryGenerator />
<FinalStory />
