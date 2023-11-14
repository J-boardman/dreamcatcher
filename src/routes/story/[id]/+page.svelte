<script lang="ts">
	import cover from '$lib/assets/nice.png';
	import Title from '$lib/components/Title.svelte';
	import { pageTitle } from '$lib/stores';
	import { onMount } from 'svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import { page } from '$app/stores';
	import CommentSection from '$lib/components/CommentSection.svelte';
	import { goto } from '$app/navigation';

	export let data;
	let liked = false;

	function preserveScroll(url: string) {
		goto(url, { noScroll: true });
	}

	onMount(() => pageTitle.set(data.title));

	$: showComments = $page.url.searchParams.get('showComments');
</script>

<main class="grid md:grid-cols-[1fr,_2.25fr] gap-2">
	<a href="/story/{data.id}/cover">
		<img
			src={cover}
			alt="cover"
			class="h-min md:sticky top-0 w-9/12 sm:w-7/12 md:w-[96%] md:mt-0 mt-4 mx-auto"
			style="view-transition-name: testing-{data.id};"
		/>
	</a>
	<section class="m-2 flex flex-col gap-2">
		<div class="md:hidden text-center">
			<Title title={data.title} />
		</div>
		<div class="md:hidden divider my-0" />
		<section class="flex gap-4 mx-2 items-center">
			<SignedIn let:user>
				<div class="flex flex-1 items-center space-x-3">
					<div class="avatar">
						<div class="mask mask-squircle w-12 h-12">
							<img src={user?.imageUrl} alt="profile" />
							<img src="/" alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
					<div class="hidden sm:flex flex-col">
						<div class="font-bold">{user?.firstName} {user?.lastName}</div>
						<div class="text-sm opacity-50">@{user?.username}</div>
					</div>
				</div>
			</SignedIn>
			<button class="btn btn-sm sm:btn-md" on:click={() => liked = !liked}>
				{#if liked}
					liked
				{:else}
                    like
				{/if}
			</button>
			<div class="join">
				<button
					on:click={() => preserveScroll(`/story/${data.id}`)}
					class="join-item btn btn-sm sm:btn-md {!showComments ? 'btn-secondary' : ''}"
				>
					Story
				</button>
				<button
					on:click={() => preserveScroll(`/story/${data.id}?showComments=true`)}
					class="join-item btn btn-sm sm:btn-md {showComments != null ? 'btn-secondary' : ''}"
				>
					Comments
				</button>
			</div>
		</section>
		<div class="divider my-0" />
		{#if showComments}
			<CommentSection comments={data.comments} />
		{:else}
			<article class="flex flex-col gap-2">
				{#each data.story.split('\n') as paragraph}
					<p>{paragraph}</p>
				{/each}
				{#each data.story.split('\n') as paragraph}
					<p>{paragraph}</p>
				{/each}
			</article>
		{/if}
	</section>
</main>
