<script lang="ts">
	import Icon from "@iconify/svelte";

	type Action = () => any;
	export let link: string = '';
	export let active = false;
	export let hiddenTextOnMobile = false;
	export let action: Action = () => undefined;
	export let classes = '';
	export let disabled = false;
    export let icon = ""

	$: buttonClasses = 'h-full btn join-item ' + classes;
</script>

{#if link}
	<a href={link} class={buttonClasses} class:btn-secondary={active}>
		<div class="flex flex-col sm:flex-row gap-1 items-center">
			<Icon {icon} class="text-lg"/>
			<slot name="label" class="text-sm sm:text-sm {hiddenTextOnMobile ? 'hidden md:flex' : ''}" />
			<slot />
		</div>
	</a>
{:else}
	<button {disabled} on:click={action} class={buttonClasses} class:btn-secondary={active}>
		<div class="flex flex-col sm:flex-row sm:gap-1 items-center">
			<Icon {icon} class="text-lg"/>
			<slot name="label" class="text-sm sm:text-sm {hiddenTextOnMobile ? 'hidden md:flex' : ''}" />
			<slot />
		</div>
	</button>
{/if}
