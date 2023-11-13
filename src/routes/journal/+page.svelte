<script lang="ts">
    import { useChat } from 'ai/svelte';
	import { afterUpdate, onMount } from 'svelte';
	
    import Chatbox from '$lib/components/ChatBox.svelte';
	import StoryGenerator from '$lib/components/journal/StoryGenerator.svelte';
	import ChapterStoryGenerator from '$lib/components/journal/ChapterStoryGenerator.svelte';
	import FinalStory from '$lib/components/journal/FinalStory.svelte';
	import DreamInterpreter from '$lib/components/journal/DreamInterpreter.svelte';
	
    import { dreamInterpretatorPrompt } from '$lib/prompts/prompts';
	import { currentStory, pageTitle } from '$lib/stores';

	type State =
		| 'INTERPRETING'
		| 'CONVERSATION_OVER'
		| 'GENERATING_CHAPTER_STORY'
		| 'STORY_GENERATION_FINISHED'
		| 'FINALISING_STORY'
		| 'GENERATING_IMAGE';

	let currentState: State = 'INTERPRETING';

	onMount(() => pageTitle.set('Dream Journal'));

	afterUpdate(() => {
		if ($currentStory.title) pageTitle.set($currentStory.title);
	});
    
	const { input, handleSubmit, messages, isLoading, append } = useChat({
		initialMessages: [
			{
				role: 'assistant',
				content: dreamInterpretatorPrompt,
				id: '001'
			}
		]
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
</script>

{#if currentState == 'FINALISING_STORY'}
	<FinalStory {appendSystemMessage} {isLoading} {messages} />
{:else}
	<main class="m-2 mx-4 h-[calc(100svh-1rem)] md:h-[calc(100svh-6rem)] flex flex-col">
		<Chatbox {messages} />
		{#if currentState == 'INTERPRETING'}
			<DreamInterpreter
				{currentState}
				{input}
				{isLoading}
				{messages}
				{appendSystemMessage}
				{handleSubmit}
			/>
		{:else if currentState == 'CONVERSATION_OVER'}
			<StoryGenerator {currentState} {isLoading} {appendSystemMessage} {messages} />
		{:else if currentState == 'GENERATING_CHAPTER_STORY'}
			<ChapterStoryGenerator {currentState} {isLoading} {appendSystemMessage} {messages} />
		{:else if (currentState = 'STORY_GENERATION_FINISHED')}
			<div class="divider">
				<span class="opacity-50 uppercase">Take your time reading</span>
			</div>
			<button on:click={() => (currentState = 'FINALISING_STORY')} class="btn mx-auto">
				Confirm story
			</button>
		{/if}
	</main>
{/if}
