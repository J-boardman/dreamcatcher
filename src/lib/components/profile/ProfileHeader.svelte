<script lang="ts">
	import type { UserResource } from '@clerk/types';
	import Title from '../Title.svelte';
	import { page } from '$app/stores';
	import PageBanner from '$lib/components/ui/PageBanner.svelte';

	export let user: Partial<UserResource> | null | undefined;

	let pathname = $page.url.pathname;
	$: filterBy = $page.url.searchParams.get('filter');
</script>

<section class="flex md:hidden mb-2 gap-4 items-center">
	<div class="mask mask-squircle w-12 h-12">
		{#if user?.imageUrl}
			<img src={user?.imageUrl} alt="profile" class="h-full w-full" />
		{:else}
			<div class="h-full w-full skeleton" />
		{/if}
	</div>
	{#if user?.username}
		<Title
			title={`${user?.username}'s profile`}
			fontSize={user?.username?.length > 15 ? 'text-2xl' : 'text-3xl'}
		/>
	{:else}
		<Title title={'Loading user'} />
	{/if}
</section>

<PageBanner>
	<a class="btn join-item {filterBy == null ? 'btn-secondary' : ''}" href={pathname}>Stories</a>
	<a class="btn join-item {filterBy == 'liked' ? 'btn-secondary' : ''}" href="{pathname}?filter=liked">
		Liked Stories
	</a>
</PageBanner>
