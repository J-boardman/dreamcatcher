<script lang="ts">
	import { page } from '$app/stores';
	import { pageTitle } from '$lib/stores';
	import SignIn from 'clerk-sveltekit/client/SignIn.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		const redirected = $page.url.searchParams.get('redirectUrl');
		if (redirected) {
			pageTitle.set('Unauthorised');
		}
	});
</script>

<div class="flex-1 grid place-items-center">
	<SignIn redirectUrl="/admin" />
</div>
