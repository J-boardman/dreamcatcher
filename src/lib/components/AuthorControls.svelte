<script lang="ts">
	import Modal from './ui/Modal.svelte';

	export let isShared = true;
	export let storyId: number;
    let deleting = false;
	function handleShareClick() {
		isShared = !isShared;
	}


    async function handleDelete(){
        deleting = true
        const data = await fetch(`/api/stories/${storyId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        })
        const result = await data.json()
        console.log(result)
        deleting = false;
    }
</script>

<a href="/story/{storyId}/edit" class="btn h-full join-item">Edit</a>
<button on:click={handleShareClick} class="btn h-full join-item">
	{isShared ? 'Shared' : 'Share'}
</button>
<Modal classes="h-full rounded-l-none rounded-r-xl " buttonText="Delete" open>
	<h2 slot="title">Confirm Delete</h2>
	<button disabled={deleting} on:click={handleDelete} class="btn btn-error">Delete</button>
</Modal>
<!-- <button class="btn h-full join-item">Delete</button> -->
