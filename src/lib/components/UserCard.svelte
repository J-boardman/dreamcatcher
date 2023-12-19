<script lang="ts">
    type User = {
        imageUrl: string,
        username: string | null,
        firstName: string | null,
        id: string
    }

	export let user: User
</script>

<div class="flex flex-1 items-center space-x-3 ">
	<a href="/profile/{user.id}" class="avatar">
		{#if user}
			<div class="mask mask-squircle w-10 h-10">
				<img src={user?.imageUrl + "?enhanced"} alt="profile" />
				<img src="/" alt="Avatar Tailwind CSS Component" />
			</div>
		{:else}
			<div class="mask mask-squircle w-10 h-10 skeleton" />
		{/if}
	</a>
	<div class="flex flex-col">
		{#if user}
			<a href="/profile/{user?.id}" class="">{user?.username}</a>
		{:else}
			<div class="font-bold w-[20ch] h-6 skeleton" />
			<div class="text-sm opacity-50 w-[20ch] h-4 skeleton" />
		{/if}
	</div>
</div>
