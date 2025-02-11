<script lang="ts">
	import SvelteKitExamples from './SvelteKitExamples.svelte';
	import NextJsExamples from './NextJsExamples.svelte';

	let activeFramework = $state('sveltekit');
	let activeSection = $state('basic-usage');

	const sections = [
		{ id: 'basic-usage', title: 'Basic Usage' },
		{ id: 'formatting', title: 'Date Formatting' },
		{ id: 'timezone', title: 'Timezone Handling' },
		{ id: 'operations', title: 'Date Operations' },
		{ id: 'parsing', title: 'Date Parsing' },
		{ id: 'utilities', title: 'Utility Functions' }
	];

	function handleFrameworkClick(framework: string) {
		activeFramework = framework;
	}

	function handleSectionClick(id: string) {
		activeSection = id;
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-4xl font-bold">Date Handling Examples</h1>

	<div class="mb-8">
		<div class="flex space-x-4">
			<button
				class="rounded px-4 py-2 {activeFramework === 'sveltekit'
					? 'bg-purple-600 text-white'
					: 'bg-gray-200 text-gray-700'}"
				onclick={() => handleFrameworkClick('sveltekit')}
			>
				SvelteKit
			</button>
			<button
				class="rounded px-4 py-2 {activeFramework === 'nextjs'
					? 'bg-purple-600 text-white'
					: 'bg-gray-200 text-gray-700'}"
				onclick={() => handleFrameworkClick('nextjs')}
			>
				Next.js
			</button>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
		<nav class="lg:col-span-1">
			<ul class="space-y-2">
				{#each sections as section}
					<li>
						<a
							href="#{section.id}"
							class="block rounded px-4 py-2 {activeSection === section.id
								? 'bg-purple-100 text-purple-700'
								: 'text-gray-700 hover:bg-gray-100'}"
							onclick={() => handleSectionClick(section.id)}
						>
							{section.title}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="lg:col-span-3">
			{#if activeFramework === 'sveltekit'}
				<SvelteKitExamples {activeSection} />
			{:else}
				<NextJsExamples {activeSection} />
			{/if}
		</div>
	</div>
</div>
