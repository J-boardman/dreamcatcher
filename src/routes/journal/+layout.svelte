<script>
	import { state } from '$lib/stores';

	state.set('STORY_GENERATION_FINISHED');
</script>

{#if $state == 'FINALISING_STORY'}
	<main class="grid md:grid-cols-[1fr,_2.25fr] gap-2">
		<slot />
	</main>
{:else}
	<main class="m-2 mx-4 h-[calc(100svh-1rem)] md:h-[calc(100svh-6rem)] grid">
		<slot />
	</main>
{/if}
