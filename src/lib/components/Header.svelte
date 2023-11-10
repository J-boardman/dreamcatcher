<script lang="ts">
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
    import Logo from "$lib/assets/logo.png"
	import { writable } from 'svelte/store';
	import Title from './Title.svelte';
    import { headerTitle } from "$lib/stores"

</script>

<header class="hidden md:flex h-16 justify-between items-center px-4 mb-2">
    <a href="/" class="flex gap-2 items-center">
        <img src={Logo} alt="logo" class="w-12">
        <Title title={$headerTitle}/>
    </a>
    <nav class="flex gap-4 items-center">
	<SignedIn>
			<a href="/journal" class="hidden md:flex">Dream Journal</a>
			<UserButton afterSignOutUrl="/" />
	</SignedIn>
	<SignedOut>
		<!-- <a href="/sign-in">Sign in</a> <span>|</span> <a href="/sign-up">Sign up</a> -->
			<SignInButton mode="modal" />
			<SignUpButton mode="modal" />
        </SignedOut>
    </nav>
</header>
