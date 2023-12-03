<script>
	import { page } from '$app/stores';
	import Title from '$lib/components/Title.svelte';
	import { writable } from 'svelte/store';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import { profileImage, profileTitle } from '$lib/stores';

	$: filterBy = $page.url.searchParams.get('filter');
	let pathname = $page.url.pathname;
	let credits = 5;
</script>

<SignedIn let:user>
	<main class="grid md:grid-cols-[2fr,_max-content,_1fr] m-2 mx-4">
		<section class="flex md:hidden mb-2 gap-4 items-center">
			<div class="mask mask-squircle w-12 h-12">
				<img src={user?.imageUrl} alt="Avatar Tailwind CSS Component" />
			</div>
			<Title title={`${$profileTitle}'s profile`} />
		</section>
		<section class="rounded-xl bg-base-200/60 flex items-center h-min p-4">
			<nav class="text-xl flex gap-4">
				<a class={filterBy == null ? 'text-secondary' : ''} href={pathname}>Stories</a>
				<a class={filterBy == 'liked' ? 'text-secondary' : ''} href="{pathname}?filter=liked">
					Liked Stories
				</a>
			</nav>
		</section>
        <div class="divider md:divider-horizontal" />
		<section class="grid gap-4">
			<h2 class="text-2xl">About</h2>
			<article>
				<h3 class="text-xl">Credits remaining: {credits}</h3>
				<progress class="progress progress-secondary w-56" value={credits} max="10" />
			</article>
		</section>
		<slot />
	</main>
</SignedIn>
