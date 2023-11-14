<script lang="ts">
    import { useChat } from 'ai/svelte';
	import { afterUpdate, onMount } from 'svelte';
    
	import Chatbox from '$lib/components/ChatBox.svelte';
	import StoryGenerator from '$lib/components/journal/StoryGenerator.svelte';
	import ChapterStoryGenerator from '$lib/components/journal/ChapterStoryGenerator.svelte';
	import FinalStory from '$lib/components/journal/FinalStory.svelte';
	import DreamInterpreter from '$lib/components/journal/DreamInterpreter.svelte';
    
	import { state, conversations, type Conversation } from '$lib/stores';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { findConversation, loadConversations, saveConversations, updateConversation } from '$lib/conversations';
    
	let conversationID = $page.url.searchParams.get('conversation')?.toString() || "";
    
	onMount(() => {
        updateMessages();
        
        messages.subscribe((val) => {
            const currentConversation = findConversation(conversationID);
            if (!currentConversation || val.length < currentConversation.messageList.length) return;
            currentConversation.messageList = val;
            saveConversations();
        });
        
        state.subscribe((val) => {
            if (!conversationID) return;
            updateConversation(conversationID, { lastState: val });
            saveConversations();
        });
	});
    
	afterUpdate(() => {
        updateMessages();
		conversationID = $page.url.searchParams.get('conversation')?.toString() || "";
	});

    afterNavigate(() => {
        conversations.set(loadConversations());
        updateMessages();
    });

	function updateMessages() {
        const foundConversation = findConversation(conversationID);
		if (!foundConversation) return;
		$messages = foundConversation.messageList;
		state.set(foundConversation.lastState);
	}


	const { input, handleSubmit, messages, isLoading, append } = useChat({
		initialMessages: $conversations.find((item) => item.id == conversationID)?.messageList
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
		if (!conversationID) return;
		updateConversation(conversationID, { lastState: 'FINALISING_STORY' });
		saveConversations();
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
