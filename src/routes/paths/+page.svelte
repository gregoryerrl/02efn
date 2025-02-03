<script lang="ts">
    import type { PageData } from './$types';
    import { ChevronLeft } from 'lucide-svelte';
    let { data }: { data: PageData } = $props();
</script>

<div class="w-screen h-screen flex flex-col gap-4 justify-center items-center">
    <span class="text-2xl font-bold animate-pulse">Coming Soon</span>
    <a href="/lab" class="relative after:absolute after:bg-current after:h-[1px] after:w-0 after:left-1/2 after:-translate-x-1/2 after:bottom-0 hover:after:w-full after:transition-all after:duration-300">Click here to go to the lab page.</a>
</div>