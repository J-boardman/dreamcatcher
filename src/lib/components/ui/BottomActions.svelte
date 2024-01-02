<script>
	export let fullWidth = false;
    export let height = "h-12 md:h-14"
</script>

<section
	class="bg-base-200 flex items-center {height} max-w-3/4 fixed z-30 bottom-4 md:bottom-2 text-xl left-2 join rounded-xl"
	class:md:w-full={fullWidth}
	class:md:max-w-[99%]={fullWidth}
>
	<slot />
</section>
