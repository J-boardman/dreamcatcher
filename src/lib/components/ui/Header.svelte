<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import HeaderImage from '$lib/components/HeaderImage.svelte';
	import Title from '../Title.svelte';
	import { pageTitle } from '$lib/stores';
</script>

<header class="hidden md:flex h-16 justify-between items-center px-4">
	<div class="flex gap-2 items-center">
		<HeaderImage />
		<Title title={$pageTitle} />
	</div>
	<nav class="flex gap-4 items-center">
		<SignedIn>
			<a href="/feed">Newsfeed</a>
			<a href="/journal">Dream Journal</a>
			<a href="/profile">Profile</a>
			<UserButton afterSignOutUrl="/" />
		</SignedIn>
		<SignedOut>
			<SignInButton mode="modal" class="btn" />
		</SignedOut>
	</nav>
</header>
