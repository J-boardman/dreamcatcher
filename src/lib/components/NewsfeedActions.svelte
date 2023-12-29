<script lang="ts">
	import { page } from '$app/stores';
	import { handleNewJournal, isFollowingFeed } from '$lib';
    
	import BottomAction from './ui/BottomAction.svelte';
	import BottomActions from './ui/BottomActions.svelte';

	import GlobeIcon from 'virtual:icons/fluent-mdl2/world';
	import UserIcon from 'virtual:icons/ph/user-bold';
	import CreateIcon from 'virtual:icons/system-uicons/create';

	$: followingFeed = isFollowingFeed($page.url);
</script>

<BottomActions>
	<BottomAction link="/feed" active={!followingFeed}>
		<GlobeIcon slot="icon" />
		<span slot="label">Global</span>
	</BottomAction>
	<BottomAction link="/feed?filter=following" active={followingFeed}>
		<UserIcon slot="icon" />
        <span slot="label">Following</span>
	</BottomAction>
	<BottomAction action={handleNewJournal}>
		<CreateIcon slot="icon" />
		<span slot="label">New Journal</span>
	</BottomAction>
</BottomActions>
