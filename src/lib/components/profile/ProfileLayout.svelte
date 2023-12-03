<script lang="ts">
	import type { UserResource } from '$lib/types';
	import AboutSection from './AboutSection.svelte';
	import ProfileHeader from './ProfileHeader.svelte';

	export let user: Partial<UserResource>;
</script>

<section>
	<ProfileHeader {user} />
	<section class="m-2">
		<slot />
	</section>
</section>
<div class="divider md:divider-horizontal" />
<AboutSection {user} />
