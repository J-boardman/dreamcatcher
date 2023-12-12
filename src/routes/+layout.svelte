<script>
	import '../app.css';
	import Header from '$lib/components/ui/Header.svelte';
	import { onNavigate } from '$app/navigation';
	import Background from '$lib/components/ui/Background.svelte';
	import MobileNav from '$lib/components/ui/MobileNav.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"

    
    injectSpeedInsights()
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
		<slot />
	<SignedIn>
		<MobileNav />
	</SignedIn>
</section>
