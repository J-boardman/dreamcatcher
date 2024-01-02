<script lang="ts">
	import { getChatContext } from '$lib';
	import { journal, state } from '$lib/stores';

	const { isLoading } = getChatContext();
</script>

{#if $state == 'CONVERSATION_OVER'}
	<section class="grid grid-cols-2 gap-2 md:gap-4 h-min">
        <input
        type="text"
        placeholder="Mood (Optional)"
        list="moods"
        class="input"
        name="mood"
        bind:value={$journal.story.mood}
        disabled={$isLoading}
		/>
		<datalist id="moods">
            <option>Wholesome</option>
			<option>Scary</option>
			<option>Funny</option>
			<option>Sad</option>
			<option>Mysterious</option>
			<option>Fantastical</option>
			<option>Romantic</option>
			<option>Gloomy</option>
		</datalist>
		<input
			type="text"
			placeholder="Setting (Optional)"
			list="settings"
			class="input"
			name="setting"
			bind:value={$journal.story.setting}
			disabled={$isLoading}
		/>
		<datalist id="settings">
            <option>Medieval</option>
			<option>Futuristic</option>
			<option>Fantasy</option>
			<option>Historical</option>
			<option>Post Apocalypse</option>
			<option>Magical Realm</option>
			<option>Mysterious Location</option>
			<option>Outer Space</option>
			<option>Secluded Island</option>
			<option>Vast desert</option>
			<option>Dense Jungle</option>
		</datalist>
	</section>
{/if}
