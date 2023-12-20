<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resetHeaderImage } from '$lib';
	import WelcomeHero from '$lib/components/home/WelcomeHero.svelte';
	import { pageTitle } from '$lib/stores';
	
    afterNavigate(() => {
        pageTitle.set('Dreamcatcher');
		resetHeaderImage();
	});
</script>

<main class="m-2 md:mx-4 mb-16 md:mb-24 flex-1 grid">
		<WelcomeHero />
</main>