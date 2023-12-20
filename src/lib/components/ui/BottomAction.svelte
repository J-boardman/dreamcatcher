<script lang="ts">
	export let link: string = '';
	export let active = false;
	export let text = '';
	export let hiddenTextOnMobile = false;
	export let action: null | (() => any) = null;
</script>

{#if link}
	<a href={link} class="h-full btn join-item" class:btn-secondary={active}>
		<div class="flex flex-col sm:flex-row sm:gap-1 items-center">
			<slot />
			<span class="text-xs sm:text-sm {hiddenTextOnMobile ? 'hidden md:flex' : ''}">{text}</span>
		</div>
	</a>
{:else if action}
	<button on:click={action} class="h-full btn join-item {active ? 'btn-secondary' : ''}">
		<div class="flex flex-col sm:flex-row items-center">
			<slot />
			<span class="text-xs sm:text-sm {hiddenTextOnMobile ? 'hidden md:flex' : ''}">{text}</span>
		</div>
	</button>
{/if}
