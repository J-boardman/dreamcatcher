<script lang="ts">
	import Modal from "./ui/Modal.svelte";

	export let isShared = true;
    export let storyId: number;
 
	function handleShareClick() {
		isShared = !isShared;
	}
</script>

<a href="/story/{storyId}/edit" class="btn h-full join-item">Edit</a>
<button on:click={handleShareClick} class="btn h-full join-item">
    {isShared ? 'Shared' : 'Share'}
</button>
<Modal classes="h-full rounded-l-none rounded-r-xl " buttonText="Delete">
    Confirm Delete
</Modal>
<!-- <button class="btn h-full join-item">Delete</button> -->