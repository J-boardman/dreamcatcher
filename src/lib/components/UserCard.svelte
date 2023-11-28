<script lang="ts">
	import type { User } from '@clerk/backend';
    import type { UserResource} from "@clerk/types"

	export let user: Partial<User> | UserResource | undefined | null = undefined;
</script>

<div class="flex flex-1 items-center space-x-3">
	<div class="avatar">
		{#if user}
			<div class="mask mask-squircle w-12 h-12">
				<img src={user?.imageUrl + "?enhanced"} alt="profile" />
				<img src="/" alt="Avatar Tailwind CSS Component" />
			</div>
		{:else}
			<div class="mask mask-squircle w-12 h-12 skeleton" />
		{/if}
	</div>
	<div class="flex flex-col">
		{#if user}
			<div class="font-bold">
				{user?.firstName || user?.username}
				{user?.lastName || ''}
			</div>
			<a href="/profile/{user?.id}" class="text-sm opacity-50 link link-hover">@{user?.username}</a>
		{:else}
			<div class="font-bold w-[20ch] h-6 skeleton" />
			<div class="text-sm opacity-50 w-[20ch] h-4 skeleton" />
		{/if}
	</div>
</div>
