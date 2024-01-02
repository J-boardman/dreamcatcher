<script>
	import MobileNav from './MobileNav.svelte';
	let innerWidth = 0;
    export let journalPage = false;

</script>

<svelte:window bind:innerWidth />

<section
	class="flex items-center h-12 md:h-14 z-30 text-xl left-2 rounded-xl sticky bottom-0 gap-2"
    class:bottom-padding={!journalPage}
>
	<section class=">:bg-base-200 join flex-1">
		<slot />
	</section>
	{#if innerWidth < 768}
		<MobileNav />
	{/if}
</section>


<style>
    .bottom-padding {
        bottom: 0.5rem;
        margin: 0 1rem;
    }
</style>