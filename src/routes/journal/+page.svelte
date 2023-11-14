<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { afterUpdate, onMount } from 'svelte';

	import Chatbox from '$lib/components/ChatBox.svelte';
	import StoryGenerator from '$lib/components/journal/StoryGenerator.svelte';
	import ChapterStoryGenerator from '$lib/components/journal/ChapterStoryGenerator.svelte';
	import FinalStory from '$lib/components/journal/FinalStory.svelte';
	import DreamInterpreter from '$lib/components/journal/DreamInterpreter.svelte';

	import { currentStory, pageTitle, state, conversations } from '$lib/stores';
	import resetHeaderImage from '$lib/resetHeaderImage';
	import { page } from '$app/stores';
	import { afterNavigate, goto } from '$app/navigation';

	let conversationID = $page.url.searchParams.get('conversation')?.toString();
    

	onMount(() => {
        resetHeaderImage();
		pageTitle.set('Dream Journal');
		updateMessages();
	});

	afterUpdate(() => {
		if ($currentStory.title) pageTitle.set($currentStory.title);
        else pageTitle.set("Dream Journal")
		updateMessages();
		conversationID = $page.url.searchParams.get('conversation')?.toString();
	});

	function updateMessages() {
		if (conversationID) {
			const found = $conversations?.find((item) => item.id == conversationID);
			if (found) {
				$messages = found.messageList;
				state.set(found.lastState);
			}
		}
	}

	afterNavigate(() => {
		conversations.set(JSON.parse(localStorage.getItem('conversations') || '[]'));
		updateMessages();
	});

	const { input, handleSubmit, messages, isLoading, append } = useChat({
		initialMessages: $conversations.find((item) => item.id == conversationID)?.messageList
	});

	messages.subscribe((val) => {
		const found = $conversations?.find((item) => item.id == conversationID);
		if (found) {
			if (val.length >= found.messageList.length) {
				found.messageList = val;
				localStorage.setItem('conversations', JSON.stringify($conversations));
			}
		}
	});

	state.subscribe((val) => {
		const found = $conversations.find((item) => item.id == conversationID);
		if (found) {
			found.lastState = val;
			localStorage.setItem('conversations', JSON.stringify($conversations));
		}
	});

    currentStory.subscribe(val => {
        localStorage.setItem("currentStory", JSON.stringify($currentStory))
    })

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
		const found = $conversations?.find((item) => item.id == conversationID);
		if (found) {
            found.lastState = 'FINALISING_STORY';
            console.log($conversations)
			localStorage.setItem('conversations', JSON.stringify($conversations));
            state.set("FINALISING_STORY")
		}
	}
	$: console.log($state);
</script>

<FinalStory {appendSystemMessage} {isLoading} {messages} />
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
