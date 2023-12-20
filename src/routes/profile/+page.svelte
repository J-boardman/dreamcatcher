<script lang="ts">
	import { headerImage, newsFeedStories, pageTitle, profileTitle } from '$lib/stores';
	import ProfileLayout from '$lib/components/profile/ProfileLayout.svelte';
	import ProfileBottomNavigation from '$lib/components/profile/ProfileBottomNavigation.svelte';
	import StoryCard from '$lib/components/ui/StoryCard.svelte';
	import { page } from '$app/stores';
	import Modal from '$lib/components/ui/Modal.svelte';
	import UserCard from '$lib/components/UserCard.svelte';
	import { afterNavigate } from '$app/navigation';
	import Newsfeed from '$lib/components/home/Newsfeed.svelte';
	import { onMount } from 'svelte';

	export let data;

    onMount(() => {
        newsFeedStories.set(data.stories)
    })
	$: filter = $page.url.searchParams.get('filter');
	$: followerString = `${data.followerCount} Follower${data.followerCount == 1 ? '' : 's'}`;
	
    afterNavigate(() => {
		pageTitle.set(`${data.user?.username}'s profile`);
		profileTitle.set(`${data?.user?.username}`);
		headerImage.set({ src: `${data.user?.imageUrl}`, rounded: true });
	});
</script>

<ProfileLayout user={data.user}>
	<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
		{#each data.stories as story}
			<a href="/story/{story.id}">
				<StoryCard {story} hideAuthorCard={filter != 'liked'} />
			</a>
		{/each}
	</section>
</ProfileLayout>

<ProfileBottomNavigation>
    {#if data.followers.length}
	<Modal buttonText={followerString} classes="h-full rounded-l-none rounded-r-xl">
		<h2 slot="title" class="text-2xl">{followerString}</h2>
		<article class="grid gap-4">
			{#each data.followers as follower}
				<UserCard user={follower} />
			{/each}
		</article>
	</Modal>
    {/if}
</ProfileBottomNavigation>
