<script lang="ts">
    import { ChevronLeft, Calendar } from 'lucide-svelte';
</script>

<div class="min-h-screen w-full">
    <div class="container mx-auto px-4 py-8">
        <div class="flex items-center gap-2 mb-8">
            <a href="/" class="text-gray-600 hover:text-gray-900">
                <ChevronLeft />
            </a>
            <h1 class="text-3xl font-bold">Lab</h1>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            <a 
                href="/lab/date" 
                class="group p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
            >
                <div class="flex items-start gap-4">
                    <div class="p-2 bg-blue-50 rounded-lg">
                        <Calendar class="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold mb-2 group-hover:text-blue-600">Working with Dates</h2>
                        <p class="text-gray-600">Learn date manipulation, formatting, and timezone handling in different frameworks</p>
                    </div>
                </div>
            </a>

            <!-- More lab items will be added here -->
        </div>
    </div>
</div>