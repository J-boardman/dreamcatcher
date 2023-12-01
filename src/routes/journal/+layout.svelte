<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { resetHeaderImage } from '$lib';

	import { pageTitle } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {});

	afterNavigate(() => {
		resetHeaderImage();
		pageTitle.set('Dream Journal');
	});
</script>

<slot />
