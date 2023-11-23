<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Journal, journal } from '$lib/Journals';
	import resetHeaderImage from '$lib/resetHeaderImage';
	import { pageTitle, state, type State } from '$lib/stores';
	import { afterUpdate, onMount } from 'svelte';

	onMount(() => {});

	afterNavigate(() => {
		resetHeaderImage();
		pageTitle.set('Dream Journal');
	});
</script>

<slot />
