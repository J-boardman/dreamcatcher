<script>
	import MobileNav from './MobileNav.svelte';

	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<section
	class="bg-base-200 flex items-center h-12 md:h-14 z-30 text-xl left-2 join rounded-xl sticky bottom-2 mx-1 md:mx-2 md:w-fit"
>
	<slot />
	{#if innerWidth < 768}
		<MobileNav />
	{/if}
</section>
