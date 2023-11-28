<script lang="ts">
	import { page } from '$app/stores';
	import { pageTitle } from '$lib/stores';
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte';
	import { onMount } from 'svelte';

	let message = '';

	onMount(() => {
		const redirected = $page.url.searchParams.get('redirectUrl');
		if (redirected) {
			pageTitle.set('Unauthorised');
		}
	});
</script>

<div class="grid place-items-center">
	<div class=" my-4 font-bold text-secondary text-2xl">{message}</div>
	<SignIn redirectUrl="/admin" />
</div>
