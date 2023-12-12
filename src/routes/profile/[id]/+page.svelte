<script>
	import { goto } from '$app/navigation';
	import ProfileBottomNavigation from '$lib/components/profile/ProfileBottomNavigation.svelte';
	import ProfileLayout from '$lib/components/profile/ProfileLayout.svelte';
	import { headerImage, pageTitle } from '$lib/stores';
	import { clerk } from 'clerk-sveltekit/client';
	import { afterUpdate, onMount } from 'svelte';

	export let data;

	onMount(() => {
		pageTitle.set(`${data.username}'s profile`);
		headerImage.set({ src: data.imageUrl, rounded: true });
	});

	$: currentUserId = $clerk?.user?.id;

	afterUpdate(() => {
		if (currentUserId == data.id) goto('/profile', { replaceState: true });
	});
</script>

<ProfileLayout user={{ username: data.username, imageUrl: data.imageUrl }} />
<ProfileBottomNavigation />
