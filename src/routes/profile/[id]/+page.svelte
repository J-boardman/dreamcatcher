<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ProfileBottomNavigation from '$lib/components/profile/ProfileBottomNavigation.svelte';
	import ProfileLayout from '$lib/components/profile/ProfileLayout.svelte';
	import StoryCard from '$lib/components/ui/StoryCard.svelte';
	import { headerImage, pageTitle } from '$lib/stores';
	import { clerk } from 'clerk-sveltekit/client';
	import { afterUpdate, onMount } from 'svelte';

	export let data;

	onMount(() => {
		pageTitle.set(`${data.username}'s profile`);
		headerImage.set({ src: data.imageUrl, rounded: true });
	});

	$: currentUserId = $clerk?.user?.id;
	$: followerCount = data.followerCount;
	$: followedByUser = data.followedByUser;
	$: filter = $page.url.searchParams.get('filter');

	afterUpdate(() => {
		if (currentUserId == data.id) goto('/profile', { replaceState: true });
	});

	async function toggleFollow() {
		await fetch('/api/following', {
			method: followedByUser ? 'DELETE' : 'POST',
			body: JSON.stringify({
				follower: $clerk?.user?.id,
				following: data.id
			})
		});
		followerCount = await fetch(`/api/following/${data.id}`).then((r) => r.json());
		followedByUser = !followedByUser;
	}
</script>

<ProfileLayout user={{ username: data.username, imageUrl: data.imageUrl }}>
	<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each data.stories as story}
			<a href="/story/{story.id}">
				<StoryCard {story} hideAuthorCard={filter != 'liked'} />
			</a>
		{/each}
	</section>
	Followers: {followerCount}
</ProfileLayout>
<ProfileBottomNavigation>
	<button class="btn join-item h-full" on:click={toggleFollow}>
		{#if followedByUser}
			Following
		{:else}
			Follow
		{/if}
	</button>
</ProfileBottomNavigation>
