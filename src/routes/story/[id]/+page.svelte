<script lang="ts">
	export let data;
	import cover from '$lib/assets/nice.png';
	import Title from '$lib/components/Title.svelte';
	import { headerTitle } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		headerTitle.set(data.title);
	});
</script>

<main class="grid md:grid-cols-[1fr,_2.25fr] gap-2">
	<a href="/story/{data.id}/cover">
		<img
			src={cover}
			alt="cover"
			class="h-min md:sticky top-0"
			style="view-transition-name: testing-{data.id};"
		/>
	</a>
	<section class="m-2 flex flex-col gap-2">
		<div class="md:hidden">
			<Title title={data.title} />
		</div>
		<article class="flex flex-col gap-2">
			{#each data.story.split('\n') as paragraph}
				<p>{paragraph}</p>
			{/each}
			{#each data.story.split('\n') as paragraph}
				<p>{paragraph}</p>
			{/each}
		</article>
	</section>
</main>
