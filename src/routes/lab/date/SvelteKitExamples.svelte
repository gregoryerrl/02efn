<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-javascript';

	const { activeSection } = $props<{activeSection: string}>();

	let currentDate = $state(new Date());
	let specificDate = $state(new Date('2024-02-20'));

	// Reactive declarations using runes
	const year = $derived(currentDate.getFullYear());
	const month = $derived(currentDate.getMonth() + 1);
	const day = $derived(currentDate.getDate());
	const hours = $derived(currentDate.getHours());
	const minutes = $derived(currentDate.getMinutes());
	const seconds = $derived(currentDate.getSeconds());

	// Date calculations
	const tomorrow = $derived(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));
	const nextWeek = $derived(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
	const nextMonth = $derived(() => {
		const date = new Date(currentDate);
		date.setMonth(date.getMonth() + 1);
		return date;
	});

	// Formatted dates
	const tomorrowStr = $derived(tomorrow.toDateString());
	const nextWeekStr = $derived(nextWeek.toDateString());
	const nextMonthStr = $derived(nextMonth().toDateString());

	// Update current date every second
	$effect(() => {
		const timer = setInterval(() => {
			currentDate = new Date();
		}, 1000);
		return () => clearInterval(timer);
	});

	// Format date using Intl
	const formatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	// Get Tokyo time
	const tokyoFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'Asia/Tokyo',
		dateStyle: 'full',
		timeStyle: 'long'
	});

	onMount(() => {
		Prism.highlightAll();
	});

	$effect(() => {
		if (activeSection) {
			setTimeout(() => {
				Prism.highlightAll();
			}, 0);
		}
	});
</script>

<div class="space-y-8">
	<section id="basic-usage" class="mb-12">
		<h2 class="mb-4 text-2xl font-bold">Basic Date Usage</h2>
		<div class="rounded-lg bg-gray-50 p-4">
			<pre><code class="language-typescript">{`<script lang="ts">
	let currentDate = $state(new Date());
	let specificDate = $state(new Date('2024-02-20'));

	// Reactive declarations using runes
	const year = $derived(currentDate.getFullYear());
	const month = $derived(currentDate.getMonth() + 1);
	const day = $derived(currentDate.getDate());
	const hours = $derived(currentDate.getHours());
	const minutes = $derived(currentDate.getMinutes());
	const seconds = $derived(currentDate.getSeconds());

	$effect(() => {
		const timer = setInterval(() => {
			currentDate = new Date();
		}, 1000);
		return () => clearInterval(timer);
	});
</script>

<p>Current: {currentDate.toDateString()}</p>
<p>Components: {year}-{month}-{day} {hours}:{minutes}:{seconds}</p>`}</code></pre>
			<div class="mt-4 rounded-lg bg-gray-800 p-4 text-white">
				<h3 class="mb-2 font-semibold">Output:</h3>
				<p>Current: {currentDate.toDateString()}</p>
				<p>Components: {year}-{month}-{day} {hours}:{minutes}:{seconds}</p>
			</div>
		</div>
	</section>

	<section id="formatting" class="mb-12">
		<h2 class="mb-4 text-2xl font-bold">Date Formatting</h2>
		<div class="rounded-lg bg-gray-50 p-4">
			<pre><code class="language-typescript">{`<script lang="ts">
	let currentDate = $state(new Date());
	
	const formatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<p>US Format: {formatter.format(currentDate)}</p>
<p>ISO String: {currentDate.toISOString()}</p>`}</code></pre>
			<div class="mt-4 rounded-lg bg-gray-800 p-4 text-white">
				<h3 class="mb-2 font-semibold">Output:</h3>
				<p>US Format: {formatter.format(currentDate)}</p>
				<p>ISO String: {currentDate.toISOString()}</p>
			</div>
		</div>
	</section>

	<section id="timezone" class="mb-12">
		<h2 class="mb-4 text-2xl font-bold">Timezone Handling</h2>
		<div class="rounded-lg bg-gray-50 p-4">
			<pre><code class="language-typescript">{`<script lang="ts">
	let currentDate = $state(new Date());
	
	const tokyoFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'Asia/Tokyo',
		dateStyle: 'full',
		timeStyle: 'long'
	});

	$effect(() => {
		const timer = setInterval(() => {
			currentDate = new Date();
		}, 1000);
		return () => clearInterval(timer);
	});
</script>

<p>Local: {currentDate.toString()}</p>
<p>Tokyo: {tokyoFormatter.format(currentDate)}</p>
<p>UTC: {currentDate.toUTCString()}</p>`}</code></pre>
			<div class="mt-4 rounded-lg bg-gray-800 p-4 text-white">
				<h3 class="mb-2 font-semibold">Output:</h3>
				<p>Local: {currentDate.toString()}</p>
				<p>Tokyo: {tokyoFormatter.format(currentDate)}</p>
				<p>UTC: {currentDate.toUTCString()}</p>
			</div>
		</div>
	</section>

	<section id="operations" class="mb-12">
		<h2 class="mb-4 text-2xl font-bold">Date Operations</h2>
		<div class="rounded-lg bg-gray-50 p-4">
			<pre><code class="language-typescript">{`<script lang="ts">
	let currentDate = $state(new Date());
	
	// Date calculations with derived values
	const tomorrow = $derived(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));
	const nextWeek = $derived(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
	const nextMonth = $derived(() => {
		const date = new Date(currentDate);
		date.setMonth(date.getMonth() + 1);
		return date;
	});

	// Formatted dates
	const tomorrowStr = $derived(tomorrow.toDateString());
	const nextWeekStr = $derived(nextWeek.toDateString());
	const nextMonthStr = $derived(nextMonth().toDateString());
</script>

<p>Tomorrow: {tomorrowStr}</p>
<p>Next Week: {nextWeekStr}</p>
<p>Next Month: {nextMonthStr}</p>`}</code></pre>
			<div class="mt-4 rounded-lg bg-gray-800 p-4 text-white">
				<h3 class="mb-2 font-semibold">Output:</h3>
				<p>Tomorrow: {tomorrowStr}</p>
				<p>Next Week: {nextWeekStr}</p>
				<p>Next Month: {nextMonthStr}</p>
			</div>
		</div>
	</section>
</div>