<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Story } from '$lib/db/schema/stories';
	import { handleFetch } from '$lib/helpers/handleFetch';
	import BottomAction from './ui/BottomAction.svelte';

	import Icon from '@iconify/svelte';

	export let story: Story;
	let { id, shared } = story;
	let deleting = false;
	let confirmingDelete = false;

	$: API_URL = `/api/stories/${id}`;

	async function handleShareClick() {
		const [result, error] = await handleFetch(API_URL, {
			method: 'PATCH',
			body: { shared: !shared }
		});

		if (error) {
			console.warn(error);
			return;
		}

		console.log(result);
		shared = !shared;
	}

	async function handleDelete() {
		deleting = true;
		const [result, error] = await handleFetch(API_URL, {
			method: 'DELETE'
		});
		if (error || !result.success) {
			console.warn('Unsuccessful:');
			console.warn(error);
			return;
		}
		goto('/profile');
	}
	const toggleDeleteConfirmation = () => (confirmingDelete = !confirmingDelete);
</script>

{#if deleting}
	<button disabled class="btn join-item h-full">
		<span class="loading loading-spinner" />
		Deleting story
	</button>
{:else if confirmingDelete}
	<BottomAction classes="btn-error" action={handleDelete}>
		<Icon icon="gravity-ui:trash-bin"/>
		<span slot="label">Confirm Delete</span>
	</BottomAction>
	<BottomAction action={toggleDeleteConfirmation}>
		<span slot="label">Cancel</span>
	</BottomAction>
{:else}
	<BottomAction link="/story/{id}/edit" icon="gravity-ui:pencil">
		<span slot="label">Edit</span>
	</BottomAction>
	<BottomAction action={handleShareClick} icon={shared ? "gravity-ui:eye":"gravity-ui:eye-slash"}>
		<span slot="label">{shared ? 'Public' : 'Private'}</span>
	</BottomAction>
	<BottomAction action={toggleDeleteConfirmation} icon="gravity-ui:trash-bin">
		<span slot="label">Delete</span>
	</BottomAction>
{/if}
