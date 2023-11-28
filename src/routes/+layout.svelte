<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { onNavigate } from '$app/navigation';
	import Background from '$lib/components/Background.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import { onMount } from 'svelte';
	import { pageTitle } from '$lib/stores';

    onMount(() => pageTitle.set("Dreamcatcher"))

	onNavigate((navigation) => {
		// @ts-expect-error
		if (!document?.startViewTransition) return;

		return new Promise((fulfill) => {
			// @ts-expect-error
			document.startViewTransition(async () => {
				fulfill();
				await navigation.complete;
			});
		});
	});
</script>

<Background />
<section class="min-h-[100dvh] flex flex-col">
	<Header />
	<slot class="flex-1"/>
</section>
<SignedIn>
	<MobileNav />
</SignedIn>
