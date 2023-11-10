<script>
	import logo from '$lib/assets/logo.png';
	import { pageTitle } from '$lib/stores';
	import Title from './Title.svelte';
</script>

<div class="md:hidden h-12 w-12 rounded-full bg-base-200 sticky bottom-2 ml-auto mr-4">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<div class="dropdown dropdown-top dropdown-end w-full h-full">
		<label tabindex="0" class="h-full w-full cursor-pointer grid place-items-center">
			<img src={logo} alt="logo" class="w-8 h-8" />
		</label>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
			<h2 class="m-1 flex gap-2 items-center">
				<img src={logo} alt="logo" class="w-6 h-6" />
                <Title title={$pageTitle} fontSize="xl"/>
			</h2>
			<li><a href="/">Home</a></li>
			<li><a href="journal">Journal</a></li>
			<li><a href="/profile">Profile</a></li>
		</ul>
	</div>
</div>
