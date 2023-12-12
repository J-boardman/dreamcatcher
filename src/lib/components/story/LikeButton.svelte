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
	class="flex gap-1 h-full join-item btn md:btn-lg font-bold items-center duration-200 md:hover:text-primary {liked
		? 'text-primary'
		: 'text-white'}"
	on:click={handleLike}
>
	{#if liked}
		<HeartIconFilled class="text-2xl " />
	{:else}
		<HeartIconOutline class="text-2xl" />
	{/if}
	{likes}
</button>
