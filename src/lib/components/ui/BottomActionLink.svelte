<script lang="ts">
	export let link = '/';
	export let active = false;
	export let text = '';
	export let hiddenTextOnMobile = false;
</script>

<a href={link} class="h-full btn join-item {active ? 'btn-secondary' : 'btn-ghost'}">
	<!-- <slot /> -->
	<span class={hiddenTextOnMobile ? 'hidden md:flex' : ''}>{text}</span>
</a>
