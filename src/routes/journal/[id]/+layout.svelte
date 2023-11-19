<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
    let headerHeight = 0;

    onMount(() => {
        headerHeight = document.querySelector("header")?.offsetHeight || 0
        localStorage.setItem("latestConversation", $page.url.pathname)
    })
</script>

<main class="m-2 min-h-[calc(100svh-80px)] flex flex-col">
    <slot />
</main>
