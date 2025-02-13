<script lang="ts">
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-tomorrow.css';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-javascript';

	let activeSection = $state('setup');

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

<div class="page-container">
	<div class="max-w-4xl mx-auto">
		<header class="mb-12">
			<h1 class="text-4xl font-bold mb-4 text-green-950">Authentication in SvelteKit</h1>
			<p class="text-lg text-green-800">Learn how to implement secure authentication in your SvelteKit application using Clerk.</p>
		</header>

		<div class="space-y-16">
			<section id="setup" class="prose max-w-none">
				<div class="flex items-center space-x-2 mb-6">
					<h2 class="text-3xl font-bold m-0 text-green-950">Setting Up Clerk</h2>
					<div class="h-1 flex-1 bg-gradient-to-r from-green-400 to-transparent"></div>
				</div>
				<p class="text-lg text-green-800">First, let's install and configure Clerk in your SvelteKit application:</p>

				<div class="my-8">
					<div class="bg-green-950 rounded-t-lg px-4 py-2 text-green-50 text-sm font-medium">Terminal</div>
					<div class="rounded-b-lg bg-green-300 p-4">
						<pre class="!m-0"><code class="language-bash">npm install @clerk/clerk-js</code></pre>
					</div>
				</div>

				<p class="text-lg text-green-800">Create a new environment file with your Clerk credentials:</p>

				<div class="my-8">
					<div class="bg-green-950 rounded-t-lg px-4 py-2 text-green-50 text-sm font-medium">.env</div>
					<div class="rounded-b-lg bg-green-300 p-4">
						<pre class="!m-0"><code class="language-env">PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key</code></pre>
					</div>
				</div>

				<p class="text-lg text-green-800">Initialize Clerk in your root layout:</p>

				<div class="my-8">
					<div class="bg-green-950 rounded-t-lg px-4 py-2 text-green-50 text-sm font-medium">src/routes/+layout.ts</div>
					<div class="rounded-b-lg bg-green-300 p-4">
						<pre class="!m-0"><code class="language-typescript">{`import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
import Clerk from '@clerk/clerk-js';

let clerk = $state<Clerk | null>(null);

$effect(() => {
	if (!clerk) {
		clerk = new Clerk(PUBLIC_CLERK_PUBLISHABLE_KEY);
		await clerk.load();
	}
});

export const load = () => {
	return {
		clerk
	};
}`}</code></pre>
					</div>
				</div>
			</section>

			<section id="google" class="prose max-w-none">
				<div class="flex items-center space-x-2 mb-6">
					<h2 class="text-3xl font-bold m-0 text-green-950">Google OAuth Integration</h2>
					<div class="h-1 flex-1 bg-gradient-to-r from-green-400 to-transparent"></div>
				</div>
				<p class="text-lg text-green-800">To add Google authentication:</p>

				<ol class="list-decimal list-inside text-lg space-y-2 text-green-800">
					<li>Go to your Clerk Dashboard</li>
					<li>Enable Google OAuth provider</li>
					<li>Configure OAuth credentials</li>
				</ol>

				<div class="my-8">
					<div class="bg-green-950 rounded-t-lg px-4 py-2 text-green-50 text-sm font-medium">src/routes/auth/+page.svelte</div>
					<div class="rounded-b-lg bg-green-300 p-4">
						<pre class="!m-0"><code class="language-typescript">{`<script lang="ts">
	const clerk = $state(getContext('clerk'));

	async function signInWithGoogle() {
		await clerk?.authenticate('oauth_google');
	}
</script>

<button
	class="btn btn-primary"
	onclick={signInWithGoogle}
>
	Sign in with Google
</button>`}</code></pre>
					</div>
				</div>
			</section>

			<section id="protected" class="prose max-w-none">
				<div class="flex items-center space-x-2 mb-6">
					<h2 class="text-3xl font-bold m-0 text-green-950">Protected Routes</h2>
					<div class="h-1 flex-1 bg-gradient-to-r from-green-400 to-transparent"></div>
				</div>
				<p class="text-lg text-green-800">Create protected routes using SvelteKit's hooks:</p>

				<div class="my-8">
					<div class="bg-green-950 rounded-t-lg px-4 py-2 text-green-50 text-sm font-medium">src/hooks.server.ts</div>
					<div class="rounded-b-lg bg-green-300 p-4">
						<pre class="!m-0"><code class="language-typescript">{`import { sequence } from '@sveltejs/kit/hooks';
import { authGuard } from './lib/auth';

export const handle = sequence(
	authGuard,
	// ... other hooks
);

// src/lib/auth.ts
import type { Handle } from '@sveltejs/kit';

export const authGuard: Handle = async ({ event, resolve }) => {
	const session = await event.locals.getSession();

	if (!session && event.url.pathname.startsWith('/protected')) {
		return Response.redirect(\`\${event.url.origin}/auth\`);
	}

	return resolve(event);
};`}</code></pre>
					</div>
				</div>
			</section>

			<section id="session" class="prose max-w-none">
				<div class="flex items-center space-x-2 mb-6">
					<h2 class="text-3xl font-bold m-0 text-green-950">Session Management</h2>
					<div class="h-1 flex-1 bg-gradient-to-r from-green-400 to-transparent"></div>
				</div>
				<p class="text-lg text-green-800">Handle user sessions with Clerk's built-in session management:</p>

				<div class="my-8">
					<div class="bg-green-950 rounded-t-lg px-4 py-2 text-green-50 text-sm font-medium">src/lib/auth/session.ts</div>
					<div class="rounded-b-lg bg-green-300 p-4">
						<pre class="!m-0"><code class="language-typescript">{`import { getContext } from 'svelte';

export function useSession() {
	const clerk = getContext('clerk');
	const session = $state(clerk?.session);

	$effect(() => {
		if (clerk) {
			clerk.addListener((session) => {
				session = session;
			});
		}
	});

	return {
		session,
		isSignedIn: $derived(!!session),
		user: $derived(session?.user)
	};
}`}</code></pre>
					</div>
				</div>

				<div class="my-8">
					<div class="bg-green-950 rounded-t-lg px-4 py-2 text-green-50 text-sm font-medium">Usage in any component</div>
					<div class="rounded-b-lg bg-green-300 p-4">
						<pre class="!m-0"><code class="language-typescript">{`<script lang="ts">
	const { session, isSignedIn, user } = useSession();
</script>

{#if isSignedIn}
	<p>Welcome, {user.firstName}!</p>
{:else}
	<p>Please sign in</p>
{/if}`}</code></pre>
					</div>
				</div>
			</section>

			<section id="hooks" class="prose max-w-none">
				<div class="flex items-center space-x-2 mb-6">
					<h2 class="text-3xl font-bold m-0 text-green-950">Authentication Hooks</h2>
					<div class="h-1 flex-1 bg-gradient-to-r from-green-400 to-transparent"></div>
				</div>
				<p class="text-lg text-green-800">Create custom hooks for common authentication patterns:</p>

				<div class="my-8">
					<div class="bg-green-950 rounded-t-lg px-4 py-2 text-green-50 text-sm font-medium">src/lib/auth/hooks.ts</div>
					<div class="rounded-b-lg bg-green-300 p-4">
						<pre class="!m-0"><code class="language-typescript">{`import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const requireAuth: PageLoad = async ({ parent }) => {
	const { session } = await parent();
	
	if (!session) {
		throw redirect(302, '/auth');
	}

	return {
		user: session.user
	};
};

// Usage in protected pages
// src/routes/protected/+page.ts
export const load = requireAuth;`}</code></pre>
					</div>
				</div>

				<div class="bg-green-200 border-l-4 border-green-600 p-4 my-8">
					<p class="text-green-950 m-0">
						<strong>Pro Tip:</strong> Always validate sessions on both client and server side for maximum security.
					</p>
				</div>
			</section>
		</div>
	</div>
</div>