<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import Title from '../Title.svelte';
	import type { DreamJournal } from '$lib/types';
	import ImagePlaceholder from '../ImagePlaceholder.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';

	export let story: DreamJournal;
</script>

<section class="card card-compact min-h-[450px] group">
	<section
		class="md:opacity-0 md:group-hover:opacity-100 cursor-pointer absolute w-full bottom-0 h-fit duration-500 flex items-end"
	>
		<section
			class="w-full p-4 rounded-b-lg bg-secondary-content/80"
		>
			<div>
				<div class="md:text-lg opacity-50">Read the story:</div>
				<Title title={story?.story.title} fontSize="text-xl md:text-2xl" />
			</div>
			<SignedIn let:user>
				<div class="hidden md:flex items-center gap-3 my-1">
					<div class="avatar">
						<a href="/profile" class="mask mask-squircle w-12 h-12">
							<img src={user?.imageUrl} alt="profile" />
						</a>
					</div>
					<div>
						<div class="text-sm opacity-50">Shared by</div>
						<a href="/profile" class="font-bold hover:opacity-80">
							@{user?.username}
						</a>
					</div>
				</div>
			</SignedIn>
		</section>
	</section>
	<figure class="-z-[1] aspect-4/7 w-full h-auto rounded-xl">
		{#if story.finalImageUrl}
			<CldImage
				src={story.finalImageUrl}
				height={1024}
				width={1792}
				style="height: 100%; view-transition-name: testing-{story.id}; border-radius: 12px"
			/>
			<!-- on:error={() => (story.image.url = '')} -->
		{:else}
			<ImagePlaceholder />
		{/if}
	</figure>
</section>
