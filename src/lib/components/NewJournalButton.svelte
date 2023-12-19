<script>
	import { goto } from '$app/navigation';
	import { createJournal } from '$lib/helpers/journal';
	import CreateIcon from 'virtual:icons/system-uicons/create';

	export let hideTextOnMobile = false;

	export function handleNewStory() {
		const newStory = createJournal();
		goto(`/journal/${newStory.id}`);
	}
</script>

<button on:click={handleNewStory} class="btn btn-ghost join-item h-full">
	<CreateIcon class="text-xl" />
	<span class={hideTextOnMobile ? 'hidden md:flex' : ''}>New Journal</span>
</button>
