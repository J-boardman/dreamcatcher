<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import Title from '../Title.svelte';
	import ImagePlaceholder from '../ImagePlaceholder.svelte';
	import type { StoryWithAuthor } from '$lib/types';

	export let story: StoryWithAuthor;
	export let hideAuthorCard = false;
</script>

<section class="card card-compact min-h-[450px] group">
	<section
		class="md:opacity-0 md:group-hover:opacity-100 cursor-pointer absolute w-full bottom-0 h-fit duration-500 flex items-end"
	>
		<section class="w-full p-4 rounded-b-lg bg-secondary-content/80">
			<div>
				<div class="md:text-lg opacity-50">Read the story:</div>
				<Title title={story?.title} fontSize="text-xl md:text-2xl" />
			</div>
			<div class="hidden {hideAuthorCard ? '' : 'md:flex'} items-center gap-3 my-1">
				<div class="avatar">
					<a href="/profile/{story.authorId}" class="mask mask-squircle w-12 h-12">
						<img src={story.author.imageUrl} alt="profile" />
					</a>
				</div>
				<div>
					<div class="text-sm opacity-50">Shared by</div>
					<a href="/profile/{story.authorId}" class="font-bold hover:opacity-80">
						@{story.author.username}
					</a>
				</div>
			</div>
		</section>
	</section>
	<figure class="-z-[1] aspect-4/7 w-full h-auto rounded-xl skeleton bg-secondary-content/80">
		{#if story.imageUrl}
			<CldImage
				height={896}
				width={512}
				src={story.imageUrl}
				class="h-full rounded-xl"
				style="view-transition-name: testing-{story.id};"
			/>
		{:else}
			<ImagePlaceholder />
		{/if}
	</figure>
</section>
