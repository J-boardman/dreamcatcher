<script lang="ts">
	import { page } from '$app/stores';
	import { isFollowingFeed } from '$lib';
	import { handleNewJournal } from '$lib/helpers/journal';
	import BottomAction from './ui/BottomAction.svelte';
	import BottomActions from './ui/BottomActions.svelte';
	$: followingFeed = isFollowingFeed($page.url);
</script>

<BottomActions>
	<BottomAction link="/feed" active={!followingFeed} icon="fluent-mdl2:world">
		<span slot="label">Global</span>
	</BottomAction>
	<BottomAction link="/feed?filter=following" active={followingFeed} icon="ph:user-bold">
		<span slot="label">Following</span>
	</BottomAction>
	<BottomAction action={handleNewJournal} icon="system-uicons:create">
		<span slot="label">New Journal</span>
	</BottomAction>
</BottomActions>
