<script lang="ts">
	import { headerImage, pageTitle, profileTitle } from '$lib/stores';
	import ProfileLayout from '$lib/components/profile/ProfileLayout.svelte';
	import ProfileBottomNavigation from '$lib/components/profile/ProfileBottomNavigation.svelte';
	import StoryCard from '$lib/components/ui/StoryCard.svelte';
	import { clerk } from 'clerk-sveltekit/client';

	export let data;

	$: pageTitle.set(`${data.user?.username}'s profile`);
	$: profileTitle.set(`${data?.user?.username}`);
	$: headerImage.set({ src: `${data.user?.imageUrl}`, rounded: true });

	function isAuthorCurrentUser(id: string | undefined) {
		return $clerk?.user?.id == id;
	}
</script>

<ProfileLayout user={data.user}>
	<section class="grid grid-cols-4">
		{#each data.stories as story}
			<a href="/story/{story.id}{isAuthorCurrentUser(story.authorId) ? '/edit' : ''}">
				<StoryCard {story} editable={isAuthorCurrentUser(story.authorId)} />
			</a>
		{/each}
	</section>
</ProfileLayout>
<ProfileBottomNavigation currentUserProfile />
