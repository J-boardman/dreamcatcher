<script>
	import Title from "$lib/components/Title.svelte";
import { pageTitle } from "$lib/stores";
	import { clerk } from "clerk-sveltekit/client";
    export let data;
    $: user = $clerk?.user?.username

    $: pageTitle.set(`${user}'s profile`)
    $: console.log(data.filterBy)

    let credits = 10;

</script>

<main class="grid md:grid-cols-[4fr,_max-content,_2fr] m-2 mx-4">
    <section class="flex md:hidden mb-2">
        <Title title={`${user}'s profile`}/>
    </section>
    <section class="rounded-xl bg-base-200/60 h-min p-4">
        <nav class="text-xl flex gap-4">
            <a class="{data.filterBy == null ? "text-secondary" : ""}" href="/profile">Stories</a>
            <a class="{data.filterBy == "liked" ? "text-secondary" : ""}" href="/profile?filter=liked">Liked Stories</a>
            <a class="{data.filterBy == "dreams" ? "text-secondary" : ""}" href="/profile?filter=dreams">Dreams</a>
        </nav>
    </section>
    <div class="divider md:divider-horizontal"></div>
    <section class="grid gap-4">
        <h2 class="text-2xl">About</h2>
        <article>
            <h3 class="text-xl">Credits remaining: {credits}</h3>
            <progress class="progress progress-secondary w-56" value={credits} max="10"></progress>
        </article>
    </section>
</main>