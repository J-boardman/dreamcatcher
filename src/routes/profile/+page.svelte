<script lang="ts">
	import { headerImage, journal, pageTitle, profileImage, profileTitle } from '$lib/stores';
	import type { DreamJournal } from '$lib/types';
	import { clerk } from 'clerk-sveltekit/client';
	import ProfileLayout from '$lib/components/profile/ProfileLayout.svelte';
	import type { UserResource } from '@clerk/types';

	pageTitle.set(`${$clerk?.user?.username}'s profile`);
	profileTitle.set(`${$clerk?.user?.username}`);
	headerImage.set({ src: `${$clerk?.user?.imageUrl}`, rounded: true });

	$: user = $clerk?.user as UserResource;
	let allJournals: DreamJournal[] = [];
</script>

<ProfileLayout {user}>
    
</ProfileLayout>
