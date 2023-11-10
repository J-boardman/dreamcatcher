<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import { onNavigate } from '$app/navigation';
	import Background from '$lib/components/Background.svelte';
	import MobileNav from '$lib/components/MobileNav.svelte';

	onNavigate(() => {
		// @ts-expect-error
		if (!document?.startViewTransition) return;

		return new Promise((fulfill) => {
			// @ts-expect-error
			document.startViewTransition(() => fulfill());
		});

	});
</script>

<Background />
<Header />
<slot />
<MobileNav />  