<script lang="ts">
    import { ArrowRight } from 'lucide-svelte';
</script>

<div class="h-full w-full">
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold text-center mb-16 text-green-950 tracking-widest">02efn</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a 
                href="/lab" 
                class="group p-6 bg-green-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
                <div class="flex items-center justify-between group-hover:opacity-70 transition-all duration-200">
                    <div>
                        <h2 class="text-2xl font-semibold mb-2">Lab</h2>
                        <p class="text-gray-600">Explore code examples and learn by doing</p>
                    </div>
                    <ArrowRight class="text-green-700 group-hover:text-green-400 transition-colors" />
                </div>
            </a>

            <a 
                href="/paths" 
                class="group p-6 bg-green-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
                <div class="flex items-center justify-between group-hover:opacity-70 transition-all duration-200">
                    <div>
                        <h2 class="text-2xl font-semibold mb-2">Learning Paths</h2>
                        <p class="text-gray-600">Structured guides to master web development</p>
                    </div>
                    <ArrowRight class="text-green-700 group-hover:text-green-400 transition-colors" />
                </div>
            </a>
        </div>
    </div>
</div>
