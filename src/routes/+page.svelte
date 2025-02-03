<script lang="ts">
    import { ArrowRight } from 'lucide-svelte';
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold text-center mb-16">02efn - Zero to "Enough For Now"</h1>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a 
                href="/lab" 
                class="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-semibold mb-2">Lab</h2>
                        <p class="text-gray-600">Explore code examples and learn by doing</p>
                    </div>
                    <ArrowRight class="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
            </a>

            <a 
                href="/paths" 
                class="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <h2 class="text-2xl font-semibold mb-2">Learning Paths</h2>
                        <p class="text-gray-600">Structured guides to master web development</p>
                    </div>
                    <ArrowRight class="text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
            </a>
        </div>
    </div>
</div>
