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
	<div class="flex flex-col items-center justify-center">
		<CreateIcon class="text-xl" />
		<span class="text-xs sm:text-sm {hideTextOnMobile ? 'hidden md:flex' : ''}">New Journal</span>
	</div>
</button>
