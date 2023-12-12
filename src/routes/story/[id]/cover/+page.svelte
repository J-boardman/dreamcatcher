<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data;
	let zoom = Boolean($page.url.searchParams.get('zoom'));

	afterNavigate(() => {
		zoom = Boolean($page.url.searchParams.get('zoom'));
	});

    $: src = data.imageUrl

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
