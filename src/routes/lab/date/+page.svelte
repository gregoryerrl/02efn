<script lang="ts">
    import type { PageData } from './$types';
    import Prism from 'prismjs';
    import 'prismjs/themes/prism-tomorrow.css';
    import 'prismjs/components/prism-typescript';
    import 'prismjs/components/prism-javascript';
    import 'prismjs/components/prism-jsx';
    import 'prismjs/components/prism-tsx';
    import { ChevronLeft } from 'lucide-svelte';

    let { data }: { data: PageData } = $props();
    let mounted = $state(false);
    let processedData = $state(data);

    const handleFrameworkSelect = (framework: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('framework', framework);
        window.location.href = url.toString();
    }

    // Client-side date processing
    const processClientDates = () => {
        if (typeof window === 'undefined') return data;

        try {
            const now = new Date();
            const nextWeek = new Date(now);
            nextWeek.setDate(now.getDate() + 7);
            
            const nextMonth = new Date(now);
            nextMonth.setMonth(now.getMonth() + 1);

            // Calculate days between Jan 1 and Dec 31, 2024
            const date1 = new Date('2024-01-01');
            const date2 = new Date('2024-12-31');
            const diffInDays = Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));

            // Get client timezone info
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const offset = -new Date().getTimezoneOffset() / 60;
            const businessStart = new Date().setHours(9, 0, 0, 0);
            const businessEnd = new Date().setHours(17, 0, 0, 0);

            // Formatters
            const fullFormatter = new Intl.DateTimeFormat('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const shortFormatter = new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: '2-digit'
            });

            const timeFormatter = new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const germanFormatter = new Intl.DateTimeFormat('de-DE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const utcFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const nyFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/New_York',
                dateStyle: 'full',
                timeStyle: 'long'
            });

            const laFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'America/Los_Angeles',
                dateStyle: 'full',
                timeStyle: 'long'
            });

            const clientFormatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'long'
            });

            return {
                ...data,
                data: data.data.map(item => ({
                    ...item,
                    outputs: item.outputs.map(output => ({
                        ...output,
                        value: output.value
                            .replace('$CURRENT_ISO_DATE', now.toISOString())
                            .replace('$CURRENT_LOCAL_DATE', now.toLocaleString())
                            .replace('$CURRENT_UTC_DATE', now.toUTCString())
                            .replace('$CURRENT_TIMESTAMP', now.getTime().toString())
                            .replace('$CURRENT_FORMATTED_DATE', fullFormatter.format(now))
                            .replace('$CURRENT_SHORT_DATE', shortFormatter.format(now))
                            .replace('$CURRENT_TIME', timeFormatter.format(now))
                            .replace('$CURRENT_GERMAN_DATE', germanFormatter.format(now))
                            .replace('$CURRENT_DATE_STRING', now.toDateString())
                            .replace('$NEXT_WEEK_DATE_STRING', nextWeek.toDateString())
                            .replace('$NEXT_MONTH_DATE_STRING', nextMonth.toDateString())
                            .replace('$CURRENT_UTC_TIME', utcFormatter.format(now))
                            .replace('$CURRENT_LOCAL_TIME', timeFormatter.format(now))
                            .replace('$CURRENT_NY_TIME', nyFormatter.format(now))
                            .replace('$CURRENT_LA_TIME', laFormatter.format(now))
                            .replace('$CLIENT_TIMEZONE', timezone)
                            .replace('$CLIENT_UTC_OFFSET', offset.toString())
                            .replace('$CLIENT_LOCAL_TIME', clientFormatter.format(now))
                            .replace('$CLIENT_BUSINESS_HOURS', 
                                `${new Date(businessStart).toLocaleTimeString()} to ${new Date(businessEnd).toLocaleTimeString()}`
                            )
                            .replace('$DAYS_BETWEEN', `${diffInDays} days`)
                    }))
                }))
            };
        } catch (error) {
            console.error('Error processing dates:', error);
            return data;
        }
    }

    // Initialize on mount
    $effect(() => {
        if (typeof window !== 'undefined' && !mounted) {
            mounted = true;
            processedData = processClientDates();
            requestAnimationFrame(() => {
                Prism.highlightAll();
            });
        }
    });

    // Update when data changes
    $effect(() => {
        if (mounted) {
            processedData = processClientDates();
            requestAnimationFrame(() => {
                Prism.highlightAll();
            });
        }
    });
</script>

<div class="h-[100vh] flex flex-col">
    <div class="h-[10vh] flex justify-between items-center px-6">
        <div class="flex items-center gap-2">
            <a href="/lab"><ChevronLeft /></a>
            <h1 class="text-2xl font-bold">Dates in {processedData.framework === 'nextjs' ? 'NextJS' : 'SvelteKit'}</h1>
        </div>
        <div class="space-x-4">
            <button 
                class="px-4 py-2 rounded {processedData.framework === 'nextjs' ? 'bg-black text-white' : 'bg-gray-200'}"
                on:click={() => handleFrameworkSelect('nextjs')}
            >
                NextJS
            </button>
            <button 
                class="px-4 py-2 rounded {processedData.framework === 'sveltekit' ? 'bg-black text-white' : 'bg-gray-200'}"
                on:click={() => handleFrameworkSelect('sveltekit')}
            >
                SvelteKit
            </button>
        </div>
    </div>
    
    <div class="h-[90vh] flex">
        <aside class="w-64 p-6 border-r">
            {#each processedData.data as item}
                <a 
                    href="#{item.title}" 
                    class="block py-2 hover:text-blue-600"
                >
                    {item.title}
                </a>
            {/each}
        </aside>
    
        <main class="flex-1 p-6 overflow-y-auto">
            {#each processedData.data as item}
                <section id={item.title} class="mb-12">
                    <h2 class="text-xl font-semibold mb-4">{item.title}</h2>
                    <p class="mb-4 text-gray-700">{item.explanation}</p>
                    <pre class="!bg-[#2d2d2d] rounded-lg mb-4 overflow-x-auto"><code class="language-{processedData.framework === 'nextjs' ? 'tsx' : 'typescript'} font-['Consolas'] tracking-wide">{item.code}</code></pre>
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