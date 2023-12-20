<script lang="ts">
	import { page } from '$app/stores';
	import { handleNewJournal, isFollowingFeed } from '$lib';
	import { writable } from 'svelte/store';
	import BottomAction from './ui/BottomAction.svelte';
	import BottomActions from './ui/BottomActions.svelte';

	import GlobeIcon from 'virtual:icons/fluent-mdl2/world';
	import UserIcon from 'virtual:icons/ph/user-bold';
	import CreateIcon from 'virtual:icons/system-uicons/create';
	import { afterUpdate } from 'svelte';

	$: followingFeed = isFollowingFeed($page.url);
</script>

<BottomActions>
	<BottomAction link="/feed" active={!followingFeed} text="Global">
		<GlobeIcon />
	</BottomAction>
	<BottomAction link="/feed?filter=following" active={followingFeed} text="Following">
		<UserIcon />
	</BottomAction>
	<BottomAction action={handleNewJournal} text="New Journal">
		<CreateIcon />
	</BottomAction>
</BottomActions>
