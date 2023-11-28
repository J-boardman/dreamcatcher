<script lang="ts">
	let dialogElement: HTMLDialogElement;
	export let noAnimate = false;
	export let buttonText = 'Open';
    export let busy = false;
</script>

<!-- Open the modal using ID.showModal() method -->
<button disabled={busy} class="btn {noAnimate ? 'animate-none' : ''}" on:click={() => dialogElement?.showModal()}>
	<slot name="logo" />
	{buttonText}
</button>
<dialog bind:this={dialogElement} class="modal grid modal-bottom md:place-items-center">
	<div class="modal-box max-w-5xl mx-auto bg-base-300 rounded-2xl">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		</form>
		<slot />
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
