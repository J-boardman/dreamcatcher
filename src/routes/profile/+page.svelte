<script>
	import { headerImage, pageTitle, profileImage, profileTitle } from "$lib/stores";
	import { clerk } from "clerk-sveltekit/client";

    pageTitle.set(`${$clerk?.user?.username}'s profile`)
    profileTitle.set(`${$clerk?.user?.username}`)
    headerImage.set({ src: `${$clerk?.user?.imageUrl}`, rounded: true})
</script>
