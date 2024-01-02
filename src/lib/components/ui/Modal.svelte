<script lang="ts">
	let dialogElement: HTMLDialogElement;
	export let noAnimate = false;
	export let buttonText = 'Open';
	export let busy = false;
	export let classes = '';
	export let open = false;
</script>

<!-- Open the modal using ID.showModal() method -->
<button
	disabled={busy}
	class="btn {noAnimate ? 'animate-none' : ''} {classes}"
	on:click={() => dialogElement?.showModal()}
>
	<slot name="logo" />
    <slot name="button-text" />
	{buttonText}
</button>
<dialog bind:this={dialogElement} class="modal grid modal-bottom md:place-items-center" {open}>
	<div class="modal-box max-w-5xl mx-auto bg-base-300 md:rounded-2xl pt-0">
		<form method="dialog" class="sticky top-0 bg-base-300 z-30 pt-6">
			<article class="flex justify-between items-center">
				<slot name="title" />
				<button class="btn btn-sm btn-circle btn-ghost ml-auto">✕</button>
			</article>
			<div class="divider divider-neutral my-2" />
		</form>
		<slot />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
