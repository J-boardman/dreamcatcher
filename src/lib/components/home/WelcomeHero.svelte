<script>
	import SignInButton from 'clerk-sveltekit/client/SignInButton.svelte';
	import SignUpButton from 'clerk-sveltekit/client/SignUpButton.svelte';
</script>

<div class="hero flex-1">
	<div class="hero-content text-center">
		<div class="max-w-3xl">
			<h1 class="text-5xl font-bold">
				Unlock the <span class="text-secondary">Hidden Meanings</span> of your dreams!
			</h1>
			<p class="py-6 text-lg">
				Welcome to our dream interpretation and storytelling service, where the mysterious realm of
				dreams comes alive! Relax as our AI dream interpreter and bedtime storyteller provides
				captivating insights and imaginative tales based on your dreams!
			</p>
			<div class="flex gap-4 justify-center">
				<SignInButton class="btn" mode="modal" />
				<SignUpButton class="btn btn-secondary" mode="modal" />
			</div>
		</div>
	</div>
</div>
