<script lang="ts">
    import { headerImage } from "$lib/stores";
    import logo from "$lib/assets/logo.png?enhanced"
</script>
<a href="/">
	{#if $headerImage?.src == logo}
		<enhanced:img src={logo} alt="logo" class="w-12 {$headerImage.rounded ? 'rounded-full' : ''}" />
	{:else}
		<img
			src={$headerImage.src}
			alt="logo"
			class="w-12 {$headerImage.rounded ? 'rounded-full' : ''}"
		/>
	{/if}
</a>
