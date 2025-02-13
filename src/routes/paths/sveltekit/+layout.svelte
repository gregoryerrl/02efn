<script lang="ts">
	import '../../../app.css';
	let { children } = $props();
	
	let activeSection = $state('setup');

	const sections = [
		{
			title: 'Authentication',
			id: 'auth',
			path: '/paths/sveltekit/auth',
			subsections: [
				{ title: 'Setting Up Clerk', id: 'setup' },
				{ title: 'Google OAuth', id: 'google' },
				{ title: 'Protected Routes', id: 'protected' },
				{ title: 'Session Management', id: 'session' },
				{ title: 'Auth Hooks', id: 'hooks' }
			]
		}
	];

	function isActivePath(path: string) {
		if (typeof window !== 'undefined') {
			return window.location.pathname === path;
		}
		return false;
	}

	function isActiveSection(section: string) {
		if (typeof window !== 'undefined') {
			return window.location.pathname.includes(section);
		}
		return false;
	}
</script>

<div class="flex h-screen w-screen absolute overflow-hidden">
	<!-- Sidebar -->
	<div class="w-20% border-r border-green-400 bg-green-300">
		<div class="p-6 border-b border-green-400">
			<h1 class="text-xl font-bold text-green-950">SvelteKit Path</h1>
			<p class="mt-1 text-sm text-green-700">Learning authentication</p>
		</div>
		<nav class="p-4">
			{#each sections as section}
				<div>
					<h2 class="font-semibold text-lg px-4 py-2 text-green-950">
						{section.title}
					</h2>
					<div class="mt-2 space-y-1">
						{#each section.subsections as subsection}
							<a
								href="{section.path}#{subsection.id}"
								class="block px-4 py-2 text-sm rounded-md transition-colors {activeSection === subsection.id
									? 'bg-green-400 text-green-950 font-medium'
									: 'text-green-800 hover:bg-green-400/30'}"
							>
								{subsection.title}
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</nav>
	</div>

	<!-- Main content -->
	<div class="flex-1 min-w-0 overflow-auto bg-gradient-to-b from-green-600 to-green-300">
		{@render children()}
	</div>
</div>
