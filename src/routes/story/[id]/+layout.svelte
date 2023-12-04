<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import LikeButton from '$lib/components/story/LikeButton.svelte';
	import BottomActionLink from '$lib/components/ui/BottomActionLink.svelte';
	import BottomActions from '$lib/components/ui/BottomActions.svelte';

	let pathName = $page.url.pathname;
	$: showingComments = $page.url.searchParams.get('showComments') == 'true';
	$: console.log(showingComments);

	afterNavigate(() => {
		showingComments = $page.url.searchParams.get('showComments') == 'true';
	});
</script>

<slot />

<BottomActions>
	<LikeButton />
	<BottomActionLink link={pathName} text="Story" active={!showingComments} />
	<BottomActionLink link="{pathName}?showComments=true" text="Comments" active={showingComments} />
</BottomActions>
