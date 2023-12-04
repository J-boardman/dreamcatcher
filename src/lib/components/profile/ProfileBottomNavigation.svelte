<script lang="ts">
	import BottomActions from '$lib/components/ui/BottomActions.svelte';

	import { page } from '$app/stores';

	export let currentUserProfile = false;
    export let following = false;
	let pathname = $page.url.pathname;
	$: filterBy = $page.url.searchParams.get('filter');

    function handleFollow(){
        following = !following
    }
</script>

<BottomActions>
	<a class="h-full btn join-item {filterBy == null ? 'btn-secondary' : ''}" href={pathname}>
		Stories
	</a>
	<a
		class="h-full btn join-item {filterBy == 'liked' ? 'btn-secondary' : ''}"
		href="{pathname}?filter=liked"
	>
		Liked Stories
	</a>
	{#if currentUserProfile}
		<a
			class="h-full btn join-item {filterBy == 'followers' ? 'btn-secondary' : ''}"
			href="{pathname}?filter=followers"
		>
			Followers
		</a>

        {:else}
        <button class="btn btn-ghost h-full join-item" on:click={handleFollow}>
            {following ? "Following" : "Follow"}
        </button>
	{/if}
</BottomActions>
