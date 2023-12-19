<script lang="ts">
	import type { UserResource } from '@clerk/types';
	import Title from '../Title.svelte';
	export let user: Partial<UserResource> | null | undefined;
</script>

<section class="flex md:hidden py-2 gap-4 items-center sticky top-0 bg-black z-20">
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


