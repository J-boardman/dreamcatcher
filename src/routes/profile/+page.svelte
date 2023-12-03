<script lang="ts">
	import { headerImage, journal, pageTitle, profileImage, profileTitle } from '$lib/stores';
	import type { DreamJournal } from '$lib/types';
	import { clerk } from 'clerk-sveltekit/client';
	import { onMount } from 'svelte';

	pageTitle.set(`${$clerk?.user?.username}'s profile`);
	profileTitle.set(`${$clerk?.user?.username}`);
	headerImage.set({ src: `${$clerk?.user?.imageUrl}`, rounded: true });

	let allJournals: DreamJournal[] = [];

	onMount(() => {
		allJournals = JSON.parse(localStorage.getItem("journals") || "[]")
	});
</script>

{#each allJournals.filter((item) => item.shared) as story}
	<p>{story.story.title}</p>
{/each}
