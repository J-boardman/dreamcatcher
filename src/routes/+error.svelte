<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import MoonIcon from 'virtual:icons/line-md/moon-alt-loop';

	let previousPage = '';

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<section class="grid place-items-center h-full flex-1">
	<div class="flex gap-4 flex-col items-center text-center">
		<MoonIcon class="text-[10rem]" />
	</div>
    <p class="text-3xl font-bold">Sorry, we ran into a problem...</p>
	<div class="flex flex-col gap-4 md:flex-row">
		<!-- <a href={previousPage} class="btn btn-primary btn-lg btn-outline">It's time to go back</a> -->
        <a href="/" class="btn btn-secondary btn-lg btn-outline">Back to home</a>
	</div>
</section>
