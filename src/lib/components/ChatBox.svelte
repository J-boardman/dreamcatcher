<script>
	export let messages;
</script>

<section class="overflow-scroll border-2 rounded-xl border-base-100 flex flex-col justify-end p-2">
	<section class="h-96 max-h-96 overflow-scroll">
		{#each $messages as message, i}
			<article class="chat chat-{message.role == 'user' ? 'end' : 'start'} w-full">
				<p class="chat-bubble chat-bubble-{message.role == 'user' ? 'secondary' : ''}">
					{message.content}
				</p>
			</article>
		{/each}
	</section>
</section>
