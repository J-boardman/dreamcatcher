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

	export let data;

	onMount(() => {
		const conversations: DreamJournal[] = JSON.parse(localStorage.getItem('journals') || '[]');
		journal.set(
			conversations.find((item) => item.id == data?.id) ||
				Journal.create(data.id, 'My Dream Journal')
		);

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
	}
</script>

<ChatBox {messages} />
<DreamInterpreter {input} {isLoading} {messages} {handleSubmit} {appendSystemMessage} />
<StoryGenerator {isLoading} {messages} {appendSystemMessage} />
{#if $state == 'STORY_GENERATION_FINISHED'}
	<div class="divider">
		<span class="opacity-50 uppercase">Take your time reading</span>
	</div>
	<button on:click={finaliseStory} class="btn mx-auto"> Confirm story </button>
{/if}
<FinalStory {isLoading} {messages} {appendSystemMessage} />
