<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-javascript';

	const { activeSection } = $props<{activeSection: string}>();

	let currentDate = $state(new Date());
	let specificDate = $state(new Date('2024-02-20'));

	// Update current date every second
	setInterval(() => {
		currentDate = new Date();
	}, 1000);

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

	// Date operations
	function addDays(date: Date, days: number) {
		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	function addMonths(date: Date, months: number) {
		const result = new Date(date);
		result.setMonth(result.getMonth() + months);
		return result;
	}
</script>

<div class="space-y-8">
	<section id="basic-usage" class="mb-12">
		<h2 class="mb-4 text-2xl font-bold">Basic Date Usage</h2>
		<div class="rounded-lg bg-gray-50 p-4">
			<pre><code class="language-typescript">{`// app/date-examples/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DateExamples() {
	const [currentDate, setCurrentDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div>
			<p>Current: {currentDate.toDateString()}</p>
			<p>Components: {currentDate.getFullYear()}-{currentDate.getMonth() + 1}-{currentDate.getDate()} {currentDate.getHours()}:{currentDate.getMinutes()}:{currentDate.getSeconds()}</p>
		</div>
	);
}`}</code></pre>
			<div class="mt-4 rounded-lg bg-gray-800 p-4 text-white">
				<h3 class="mb-2 font-semibold">Output:</h3>
				<p>Current: {currentDate.toDateString()}</p>
				<p>Components: {currentDate.getFullYear()}-{currentDate.getMonth() + 1}-{currentDate.getDate()} {currentDate.getHours()}:{currentDate.getMinutes()}:{currentDate.getSeconds()}</p>
			</div>
		</div>
	</section>

	<section id="formatting" class="mb-12">
		<h2 class="mb-4 text-2xl font-bold">Date Formatting</h2>
		<div class="rounded-lg bg-gray-50 p-4">
			<pre><code class="language-typescript">{`// app/components/DateFormatter.tsx
'use client';

import { useMemo } from 'react';

export default function DateFormatter({ date }: { date: Date }) {
	const formatter = useMemo(() => new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}), []);

	return (
		<div>
			<p>US Format: {formatter.format(date)}</p>
			<p>ISO String: {date.toISOString()}</p>
		</div>
	);
}`}</code></pre>
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
			<pre><code class="language-typescript">{`// app/components/TimezoneClock.tsx
'use client';

import { useState, useEffect } from 'react';

export default function TimezoneClock() {
	const [date, setDate] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const tokyoFormatter = new Intl.DateTimeFormat('en-US', {
		timeZone: 'Asia/Tokyo',
		dateStyle: 'full',
		timeStyle: 'long'
	});

	return (
		<div>
			<p>Local: {date.toString()}</p>
			<p>Tokyo: {tokyoFormatter.format(date)}</p>
			<p>UTC: {date.toUTCString()}</p>
		</div>
	);
}`}</code></pre>
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
			<pre><code class="language-typescript">{`// app/utils/dateOperations.ts
export function addDays(date: Date, days: number) {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export function addMonths(date: Date, months: number) {
	const result = new Date(date);
	result.setMonth(result.getMonth() + months);
	return result;
}

// app/components/DateOperations.tsx
'use client';

import { useState } from 'react';
import { addDays, addMonths } from '../utils/dateOperations';

export default function DateOperations() {
	const [date] = useState(new Date());

	return (
		<div>
			<p>Tomorrow: {addDays(date, 1).toDateString()}</p>
			<p>Next Week: {addDays(date, 7).toDateString()}</p>
			<p>Next Month: {addMonths(date, 1).toDateString()}</p>
		</div>
	);
}`}</code></pre>
			<div class="mt-4 rounded-lg bg-gray-800 p-4 text-white">
				<h3 class="mb-2 font-semibold">Output:</h3>
				<p>Tomorrow: {addDays(currentDate, 1).toDateString()}</p>
				<p>Next Week: {addDays(currentDate, 7).toDateString()}</p>
				<p>Next Month: {addMonths(currentDate, 1).toDateString()}</p>
			</div>
		</div>
	</section>
</div>