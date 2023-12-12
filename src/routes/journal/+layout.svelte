<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resetHeaderImage } from '$lib';

	import { pageTitle } from '$lib/stores';

	afterNavigate(() => {
		resetHeaderImage();
		pageTitle.set('Dream Journal');
	});
</script>

<slot />
