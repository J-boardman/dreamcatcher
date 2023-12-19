<script lang="ts">
	import type { UserResource } from '$lib/types';
	import AboutSection from './AboutSection.svelte';
	import ProfileHeader from './ProfileHeader.svelte';

	export let user: Partial<UserResource>;
</script>

<section class="mb-20 md:mb-0">
	<section>
		<ProfileHeader {user} />
		<section class="md:m-2">
			<slot />
		</section>
	</section>
</section>
<div class="hidden md:flex divider divider-horizontal divider-neutral h-full" />
<AboutSection />
