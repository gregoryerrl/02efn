<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="min-h-screen min-w-screen bg-gradient-to-b from-green-600 to-green-300 flex">
	{@render children()}
</main>
