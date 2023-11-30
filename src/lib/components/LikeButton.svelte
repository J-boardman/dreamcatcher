<script lang="ts">
	import HeartIconFilled from 'virtual:icons/line-md/heart-filled';
	import HeartIconOutline from 'virtual:icons/line-md/heart';

	export let liked = false;
	export let likes = 0;

	function handleLike() {
		if (liked) likes--;
		else likes++;
		liked = !liked;
	}
</script>

<button
	class="btn btn-ghost hover:bg-transparent {liked ? 'text-primary' : 'text-white'}"
	on:click={handleLike}
>
	{likes}
	{#if liked}
		<HeartIconFilled class="text-2xl text-primary" />
	{:else}
		<HeartIconOutline class="text-2xl hover:text-primary" />
	{/if}
</button>
