<script>
	import { page } from '$app/stores';
	import { headerImage, pageTitle } from '$lib/stores';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';

	$: filterBy = $page.url.searchParams.get('filter');

    export let data;
    
    pageTitle.set(`${data.username}'s profile`)
    headerImage.set({ src: data.imageUrl, rounded: true})
</script>

<SignedIn let:user>
    {#if filterBy == "dreams" && user?.id != data.id}
        <p>Forbidden</p>
    {/if}
</SignedIn>