<script>
	export let data;
</script>

<a href="/story/{data.id}"
	><img
		src={data.src}
		alt="cover"
		class="mx-auto"
		style="view-transition-name: testing-{data.id};"
	/></a
>
