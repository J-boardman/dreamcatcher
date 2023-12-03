<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
	import Title from '../Title.svelte';
	import { pageTitle, headerImage } from '$lib/stores';
	import logo from '$lib/assets/logo.png?enhanced';
</script>

<header class="hidden md:flex h-16 justify-between items-center px-4 mb-2">
	<div class="flex gap-2 items-center">
		<a href="/">
			{#if $headerImage?.src == logo}
				<enhanced:img
					src={logo}
					alt="logo"
					class="w-12 {$headerImage.rounded ? 'rounded-full' : ''}"
				/>
			{:else}
				<img
					src={$headerImage.src}
					alt="logo"
					class="w-12 {$headerImage.rounded ? 'rounded-full' : ''}"
				/>
			{/if}
		</a>
		<Title title={$pageTitle} />
	</div>
	<nav class="flex gap-4 items-center">
		<SignedIn>
            <a href="/">Newsfeed</a>
			<a href="/journal">Dream Journal</a>
			<a href="/profile">Profile</a>
			<UserButton afterSignOutUrl="/" />
		</SignedIn>
		<SignedOut>
			<SignInButton mode="modal" class="btn"/>
		</SignedOut>
	</nav>
</header>
