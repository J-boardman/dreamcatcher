<script lang="ts">
	import BottomActions from '$lib/components/ui/BottomActions.svelte';

	import { page } from '$app/stores';
    
	let pathname = $page.url.pathname;
	$: filterBy = $page.url.searchParams.get('filter');
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
	<slot />
</BottomActions>
