<script>
	export let title = '';
	$: titleArray = title.split(' ');
	$: longestWord = titleArray.reduce((a, b) => (a.length > b.length ? a : b));
</script>

<h2 class="text-3xl">
	{#if titleArray.length == 1}
		{title}
	{:else}
		{#each titleArray as word}
			{#if word == longestWord}
				<strong class="text-secondary font-normal">{word} </strong>
			{:else}
				<strong class="font-normal">{word} </strong>
			{/if}
		{/each}
	{/if}
</h2>
