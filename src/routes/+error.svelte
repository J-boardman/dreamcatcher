<script lang="ts">
	import { page } from '$app/stores';
	import { resetHeader } from '$lib';
	import Icon from '@iconify/svelte';

    resetHeader()
</script>

<section class="grid flex-1 place-content-center *:mx-auto gap-4">
    <Icon icon="line-md:moon-alt-loop" class="text-[10rem]"/>
	<p class="text-3xl font-bold">Sorry, we ran into a problem</p>
    <p class="text-xl">{$page.error?.message} ({$page.status})</p>
	<a href="/" class="btn btn-secondary btn-lg btn-outline">Back to home</a>
</section>
