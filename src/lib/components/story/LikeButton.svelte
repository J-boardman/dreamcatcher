<script lang="ts">
	import HeartIconFilled from 'virtual:icons/ph/heart-fill';
	import HeartIconOutline from 'virtual:icons/ph/heart';

	export let liked = false;
	export let likes = 0;

	function handleLike() {
		if (liked) likes--;
		else likes++;
		liked = !liked;
	}
</script>

<button
	class="flex gap-1 font-bold items-center duration-200 md:hover:text-primary {liked
		? 'text-primary'
		: 'text-white'}"
	on:click={handleLike}
>
	{likes}
	{#if liked}
		<HeartIconFilled class="text-3xl " />
	{:else}
		<HeartIconOutline class="text-3xl" />
	{/if}
</button>
