<script lang="ts">
	let credits = 5;
</script>

<section class="grid gap-4">
	<h2 class="text-2xl">About</h2>
	<article>
		<h3 class="text-xl">Credits remaining: {credits}</h3>
		<progress class="progress progress-secondary w-56" value={credits} max="10" />
	</article>
</section>
