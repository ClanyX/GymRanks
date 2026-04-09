<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
    import { Button } from 'flowbite-svelte';

	let words = $state(['REKORDY', 'LIMITY', 'HRANICE', 'MOŽNOSTI', 'STRACHY', 'MAXIMÁLKY', 'CÍLE', 'VÝKONY', 'PŘEKÁŽKY']);
	let currentWordIndex = $state(0);
	let currentWord = $derived(words[currentWordIndex]);
	let isVisible = $state(true);

	onMount(() => {
		const interval = setInterval(() => {
			isVisible = false;
			
			setTimeout(() => {
				currentWordIndex = (currentWordIndex + 1) % words.length;
				isVisible = true;
			}, 500); 

		}, 2500);
		return () => clearInterval(interval);
	});
</script>

<div class="h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center px-4 text-center selection:bg-primary-500/20">
	<h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white font-sans leading-tight">
		PŘEKONÁVEJ SVÉ
		
		<span class="relative inline-block min-w-50 md:min-w-75 lg:min-w100 text-left">
			{#if isVisible}
				<span transition:fade={{ duration: 300 }} class="absolute inset-0 text-primary-600 dark:text-primary-500 italic uppercase">
					{currentWord}
				</span>
			{/if}
			<span class="opacity-0 uppercase italic">{words[0]}</span>
		</span>
	</h1>

    <Button outline pill color="dark" onclick={() => window.location.href = '/login'} class="mt-8 text-lg md:text-xl">
        Začni teď
    </Button>

	<p class="mt-8 text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 font-serif italic tracking-wide">
		by Filip Šandera
	</p>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
    </div>
</div>

<hr class="border-gray-200 dark:border-gray-800" />

<section class="py-20 px-4">
    <div class="max-w-4xl mx-auto">
        <div class="group relative bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500 hover:shadow-primary-500/10 hover:border-primary-500/50">
            <div class="flex flex-col md:flex-row gap-10 items-center">
                <div class="shrink-0 w-20 h-20 dark:bg-gray-700 bg-gray-300 rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary-600/20">
                    <svg class="w-10 h-10 dark:text-white text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <!-- TODO: edit text -->
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-sans italic uppercase tracking-tight">
                        Víc než jen tréninkový deník
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 font-light">
                        GymRank vznikl z potřeby mít absolutní přehled o svém progresu bez zbytečného klikání. Sledujeme tvoje <span class="text-primary-600 dark:text-primary-500 font-bold italic">maximálky</span>, analyzujeme objem práce a motivujeme tě k dalšímu opakování. Žádné reklamy, žádný balast. Jen ty a tvoje cesta za silou.
                    </p>
                    
                    <div class="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">100% Soukromí</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">Cloud Sync</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">Statistiky</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span class="text-sm font-bold dark:text-gray-300 uppercase tracking-widest">Komunita</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>