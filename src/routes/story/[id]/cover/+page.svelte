<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { DreamJournal } from '$lib/types.js';
	import { onMount } from 'svelte';

	export let data;
	let src = '';
	let zoom = Boolean($page.url.searchParams.get('zoom'));

	onMount(() => {
		const journals = JSON.parse(localStorage.getItem('journals') || '[]') as DreamJournal[];
		const journal = journals.find((item) => item.id == data.id);
		src = journal?.finalImageUrl as string;
	});

	afterNavigate(() => {
		zoom = Boolean($page.url.searchParams.get('zoom'));
	});

	function handleZoom() {
		let newLink = `/story/${data.id}/cover${!zoom ? '?zoom=true' : ''}`;
		goto(newLink, { noScroll: true, replaceState: true });
	}
</script>

<button on:click={handleZoom} class={!zoom ? 'cursor-zoom-in' : 'cursor-zoom-out'}>
	<img
		{src}
		alt="cover"
		class="mx-auto {zoom ? 'md:w-11/12' : ''}"
		style="view-transition-name: testing-{data.id};"
	/>
</button>
