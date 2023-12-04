<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ProfileBottomNavigation from '$lib/components/profile/ProfileBottomNavigation.svelte';
	import ProfileLayout from '$lib/components/profile/ProfileLayout.svelte';
	import { headerImage, pageTitle } from '$lib/stores';
	import { clerk } from 'clerk-sveltekit/client';
	import { onMount } from 'svelte';

	$: filterBy = $page.url.searchParams.get('filter');

	export let data;

	onMount(() => {
		pageTitle.set(`${data.username}'s profile`);
		headerImage.set({ src: data.imageUrl, rounded: true });
	});

	$: currentUserId = $clerk?.user?.id;
	if (currentUserId == data.id) goto('/profile');
</script>

<ProfileLayout user={{ username: data.username, imageUrl: data.imageUrl }}>
</ProfileLayout>
<ProfileBottomNavigation />