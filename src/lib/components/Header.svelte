<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
	import Title from './Title.svelte';
	import { pageTitle, headerImage } from '$lib/stores';
</script>

<header class="hidden md:flex h-16 justify-between items-center px-4 mb-2">
	<div class="flex gap-2 items-center">
		<a href="/">
			<img
				src={$headerImage.src}
				alt="logo"
				class="w-12 {$headerImage.rounded ? 'rounded-full' : ''}"
			/>
		</a>
		<Title title={$pageTitle} />
	</div>
	<nav class="flex gap-4 items-center">
		<SignedIn>
			<a href="/journal" class="hidden md:flex">Dream Journal</a>
			<a href="/profile" class="hidden md:flex">Profile</a>
			<UserButton afterSignOutUrl="/" />
		</SignedIn>
		<SignedOut>
			<!-- <a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a> -->
			<SignInButton mode="modal" />
			<SignUpButton mode="modal" />
		</SignedOut>
	</nav>
</header>
