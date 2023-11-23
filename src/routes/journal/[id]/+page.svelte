<script lang="ts">
	import { Journal, type DreamJournal, journal } from '$lib/Journals';
	import { useChat } from 'ai/svelte';
	import ChatBox from '$lib/components/ChatBox.svelte';
	import { pageTitle, state, type State } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';
	import DreamInterpreter from '$lib/components/journal/DreamInterpreter.svelte';
	import { page } from '$app/stores';
	import { afterNavigate, goto } from '$app/navigation';
	import StoryGenerator from '$lib/components/journal/StoryGenerator.svelte';
	import FinalStory from '$lib/components/journal/FinalStory.svelte';
	import ChapterStoryGenerator from '$lib/components/journal/ChapterStoryGenerator.svelte';

	export let data;

	onMount(() => {
		const conversations: DreamJournal[] = JSON.parse(localStorage.getItem('journals') || '[]');
		const foundConversation = conversations.find((item) => item.id == data?.id);

		if (foundConversation) journal.set(foundConversation);
		else {
			const newConversation = Journal.create(data.id, 'My Dream Journal');
			journal.set(newConversation);
			Journal.save();
		}

		messages.subscribe((val) => {
			if (val.length > $journal.messageList.length) {
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
			newJournal.find((item) => item.id == data.id) || Journal.create(data.id, 'Dream Journal')
		);
		setMessages($journal?.messageList);
		state.set($journal.lastState);
	});

	const { setMessages, input, handleSubmit, messages, isLoading, append } = useChat({});

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
		Journal.update({ lastState: 'FINALISING_STORY' }, true);
		state.set('FINALISING_STORY');
	}
</script>

{#if $state != 'FINALISING_STORY'}
	<div class="flex flex-col h-[calc(100svh-4rem)] md:h-[calc(100svh-5rem)] overflow-scroll">
		<ChatBox {messages} />
		<DreamInterpreter {input} {isLoading} {messages} {handleSubmit} {appendSystemMessage} />
		<StoryGenerator {isLoading} {messages} {appendSystemMessage} />
		<ChapterStoryGenerator {isLoading} {messages} {appendSystemMessage} />
        {#if $state == 'STORY_GENERATION_FINISHED'}
		<div class="divider">
            <span class="opacity-50 uppercase">Take your time reading</span>
		</div>
		<button on:click={finaliseStory} class="btn mx-auto"> Confirm story </button>
        {/if}
    </div>
{:else}
	<FinalStory {isLoading} {messages} {appendSystemMessage} />
{/if}
