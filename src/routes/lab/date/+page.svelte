<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import Prism from 'prismjs';
    import 'prismjs/themes/prism-tomorrow.css';
    import 'prismjs/components/prism-typescript';
    import 'prismjs/components/prism-javascript';
    import 'prismjs/components/prism-jsx';
    import 'prismjs/components/prism-tsx';
    import { ChevronLeft } from 'lucide-svelte';

    let { data }: { data: PageData } = $props();

    const handleFrameworkSelect = (framework: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('framework', framework);
        window.location.href = url.toString();
    }

    onMount(() => {
        Prism.highlightAll();
    });

    $effect(() => {
        // Re-highlight when data changes
        Prism.highlightAll();
    });
</script>

<div class="h-[100vh] flex flex-col">
    <div class="h-[10vh] flex justify-between items-center px-6">
        <div class="flex items-center gap-2">
            <a href="/lab"><ChevronLeft /></a>
            <h1 class="text-2xl font-bold">Dates in {data.framework === 'nextjs' ? 'NextJS' : 'SvelteKit'}</h1>
        </div>
        <div class="space-x-4">
            <button 
                class="px-4 py-2 rounded {data.framework === 'nextjs' ? 'bg-black text-white' : 'bg-gray-200'}"
                on:click={() => handleFrameworkSelect('nextjs')}
            >
                NextJS
            </button>
            <button 
                class="px-4 py-2 rounded {data.framework === 'sveltekit' ? 'bg-black text-white' : 'bg-gray-200'}"
                on:click={() => handleFrameworkSelect('sveltekit')}
            >
                SvelteKit
            </button>
        </div>
    </div>
    
    <div class="h-[90vh] flex">
        <aside class="w-64 p-6 border-r">
            {#each data.data as item}
                <a 
                    href="#{item.title}" 
                    class="block py-2 hover:text-blue-600"
                >
                    {item.title}
                </a>
            {/each}
        </aside>
    
        <main class="flex-1 p-6 overflow-y-auto">
            {#each data.data as item}
                <section id={item.title} class="mb-12">
                    <h2 class="text-xl font-semibold mb-4">{item.title}</h2>
                    <p class="mb-4 text-gray-700">{item.explanation}</p>
                    <pre class="!bg-[#2d2d2d] rounded-lg mb-4 overflow-x-auto"><code class="language-{data.framework === 'nextjs' ? 'tsx' : 'typescript'} font-['Consolas'] tracking-wide">{item.code}</code></pre>
                    <div class="bg-gray-50 p-4 rounded">
                        <p class="text-sm text-gray-600 mb-2">Output:</p>
                        <div class="space-y-2">
                            {#each item.outputs as output}
                                <div class="flex items-start">
                                    <span class="font-['Consolas'] text-gray-500 w-32">{output.label}:</span>
                                    <span class="font-['Consolas'] flex-1">{output.value}</span>
                                </div>
                            {/each}
                        </div>
                    </div>
                </section>
            {/each}
        </main>
    </div>
</div>

<style>
    /* Override Prism theme styles */
    :global(pre[class*="language-"]) {
        padding: 1rem !important;
        margin: 0 !important;
        background: #2d2d2d !important;
    }

    :global(code[class*="language-"]) {
        text-shadow: none !important;
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace !important;
        font-size: 0.9rem !important;
        line-height: 1.5 !important;
    }

    /* Custom scrollbar for code blocks */
    :global(pre::-webkit-scrollbar) {
        height: 8px;
        background-color: #2d2d2d;
    }

    :global(pre::-webkit-scrollbar-thumb) {
        background-color: #666;
        border-radius: 4px;
    }

    :global(pre::-webkit-scrollbar-track) {
        background-color: #2d2d2d;
    }
</style>