<section
	class="rounded-xl bg-base-200 flex items-center h-12 md:h-16 max-w-3/4 fixed z-30 bottom-4 left-4 md:left-6 text-xl join"
>
	<slot />
</section>

<style>
	@media screen and (max-width: 768px) {
		section > * {
			flex-grow: 1;;
		}
	}
</style>
