<script>
	import logo from '$lib/assets/logo.png';
	import { pageTitle } from '$lib/stores';
	import Title from './Title.svelte';
	import HomeIcon from 'virtual:icons/line-md/home-md';
	import BookIcon from 'virtual:icons/tdesign/book';
	import GridIcon from 'virtual:icons/line-md/grid-3-filled';
	import UserIcon from 'virtual:icons/mdi/user-outline';
	import BackIcon from 'virtual:icons/mingcute/back-2-fill';
	import LogoutIcon from 'virtual:icons/line-md/log-out';
	import { afterNavigate, goto } from '$app/navigation';
	import SignOutButton from 'clerk-sveltekit/client/SignOutButton.svelte';
    import NotificationIcon from "virtual:icons/material-symbols/mail-outline"

	let previousPage = '';

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});
</script>

<div class="md:hidden h-12 w-12 rounded-full bg-base-200 fixed bottom-4 right-4">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<div class="dropdown dropdown-top dropdown-end w-full h-full">
		<label tabindex="0" class="h-full w-full cursor-pointer grid place-items-center">
			<GridIcon class="text-2xl" />
		</label>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul
			tabindex="0"
			class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box grid grid-cols-3 w-max text-xs"
		>
			<!-- <h2 class="m-1 flex gap-2 items-center col-span-3 text-xl justify-center">
				<img src={logo} alt="logo" class="w-10 h-10" />
				Dreamcatcher
			</h2> -->
			<li><a class="flex flex-col" href="/"><HomeIcon class="text-xl" /><span> Home</span></a></li>
			<li><a class="flex flex-col" href="journal"><BookIcon class="text-xl" />Journal</a></li>
			<li><a class="flex flex-col" href="/profile"><UserIcon class="text-xl" />Profile</a></li>
			<li><a class="flex flex-col" href="/"><HomeIcon class="text-xl" /><span> Home</span></a></li>
			<li><a class="flex flex-col" href="journal"><BookIcon class="text-xl" />Journal</a></li>
			<li><a class="flex flex-col" href="/profile"><NotificationIcon class="text-xl" />Notifications</a></li>
			<li>
				<button class="flex flex-col" on:click={() => goto(previousPage, { replaceState: true })}>
					<BackIcon class="text-xl" /><span> Back</span>
				</button>
			</li>
			<li><a class="flex flex-col" href="journal"><BookIcon class="text-xl" />Journal</a></li>
			<li>
				<SignOutButton
					signOutCallback={() => goto('/', { invalidateAll: true, replaceState: true })}
					class="flex flex-col"><LogoutIcon class="text-xl" />Sign out</SignOutButton
				>
			</li>
		</ul>
	</div>
</div>
