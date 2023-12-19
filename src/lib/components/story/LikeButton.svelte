<script lang="ts">
	import HeartIconFilled from 'virtual:icons/ph/heart-fill';
	import HeartIconOutline from 'virtual:icons/ph/heart';

	export let storyID = 0;
	export let liked = false;
	export let likes = 0;
	$: API_URL = `/api/stories/${storyID}/likes`;

	async function handleLike() {
		await fetch(API_URL, {
			method: liked ? 'DELETE' : 'POST',
			headers: { 'Content-Type': 'application/json' }
		});

		likes = await fetch(API_URL).then((r) => r.json());
		liked = !liked;
	}
</script>

<button
	class="flex gap-1 h-full join-item btn font-bold items-center duration-200 md:hover:text-primary {liked
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
