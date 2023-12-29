<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate, goto } from '$app/navigation';
	import MoonIcon from 'virtual:icons/line-md/moon-alt-loop';
	import { resetHeader } from '$lib';

	let previousPage = '';

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
        resetHeader()
	});

</script>

<section class="grid place-items-center h-full flex-1">
	<div class="flex gap-4 flex-col items-center text-center">
		<MoonIcon class="text-[10rem]" />
	</div>
	<p class="text-3xl font-bold text-center">
		{#if $page.status && $page.error?.message}
            {$page.status}: {$page.error?.message}
        {:else}
			Sorry, we ran into a problem...
		{/if}
	</p>
	<div class="flex flex-col gap-4 md:flex-row">
		<!-- <a href={previousPage} class="btn btn-primary btn-lg btn-outline">It's time to go back</a> -->
		<a href="/" class="btn btn-secondary btn-lg btn-outline">Back to home</a>
	</div>
</section>
