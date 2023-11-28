<script>
	import ImageIcon from 'virtual:icons/line-md/image-twotone';

    export let loading = false;
    export let message = "No image yet"
</script>

<div
	class="w-full h-full p-4 flex flex-col justify-center items-center rounded-xl {loading ? "skeleton": ""}"
>
	<ImageIcon class="text-5xl" />
	<p>{message}</p>
</div>
