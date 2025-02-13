<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<div class="p-8">
    <h1 class="text-4xl font-bold mb-8 text-green-950">SvelteKit Learning Path</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-green-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <h2 class="text-2xl font-semibold mb-4 text-green-950">Authentication</h2>
            <p class="text-green-800 mb-4">Learn how to implement secure user authentication in your SvelteKit applications.</p>
            <a href="/paths/sveltekit/auth" class="text-green-700 hover:text-green-600 font-medium">Get Started →</a>
        </div>
    </div>
</div>