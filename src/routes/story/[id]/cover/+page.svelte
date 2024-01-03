<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { CldImage } from 'svelte-cloudinary';

	export let data;
	let zoom = Boolean($page.url.searchParams.get('zoom'));

	afterNavigate(() => {
		zoom = Boolean($page.url.searchParams.get('zoom'));
	});

	function handleZoom() {
		let newLink = `/story/${data.id}/cover${!zoom ? '?zoom=true' : ''}`;
		goto(newLink, { noScroll: true, replaceState: true });
	}
</script>

<button on:click={handleZoom} class={!zoom ? 'cursor-zoom-in' : 'cursor-zoom-out'}>
	<figure style="view-transition-name: testing-{data.id};" class="">
		<CldImage
			src={`${data.imageUrl}`}
			alt="cover"
            class="mx-auto {zoom ? 'w-full' : ''}"
			height={1792}
			width={1024}
			loading="eager"
		/>
	</figure>
</button>
