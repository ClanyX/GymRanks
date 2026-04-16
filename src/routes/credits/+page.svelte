<script lang="ts">
    import { Button, Avatar } from 'flowbite-svelte';
    import { MugHotOutline, GithubSolid, LinkedinSolid, YoutubeSolid } from 'flowbite-svelte-icons';
</script>

<div class="max-w-4xl mx-auto p-6 space-y-16">
    <section class="text-center space-y-8 pt-10">
        <div class="relative inline-block">
            <Avatar size="xl" src="/avatar.jpg" border class="ring-4 ring-primary-600 shadow-2xl shadow-primary-900/40" />
        </div>

        <div class="space-y-2">
            <h1 class="text-4xl font-black italic uppercase tracking-tighter dark:text-white">
                Vytvořil <span class="text-primary-600">Filip Šandera</span>
            </h1>
            <p class="text-gray-500 uppercase text-[10px] font-bold tracking-[0.3em]">Full-stack Developer & Fitness Enthusiast</p>
        </div>

        <p class="text-gray-400 max-w-xl mx-auto leading-relaxed">
            GymRank vznikl jako vášeň pro kódování a zvedání železa. Mým cílem bylo vytvořit nástroj, 
            který vnáší do tréninku řád a zdravou soutěživost. Celý projekt vyvíjím ve svém volném čase 
            po večerech mezi tréninky.
        </p>

        <div class="flex justify-center gap-4">
            <Button color="alternative" href="https://github.com/ClanyX" target="_blank" class="rounded-xl border-gray-800">
                <GithubSolid class="w-5 h-5 mr-2" /> GitHub
            </Button>
            <Button color="alternative" href="https://www.linkedin.com/in/filip-sandera/" target="_blank" class="rounded-xl border-gray-800">
                <LinkedinSolid class="w-5 h-5 mr-2 text-blue-400" /> LinkedIn
            </Button>
            <Button color="alternative" href="https://www.youtube.com/@clanyx" target="_blank" class="rounded-xl border-gray-800">
                <YoutubeSolid class="w-5 h-5 mr-2 text-red-600" /> Youtube
            </Button>
        </div>
    </section>

    <section class="relative overflow-hidden rounded-3xl border border-primary-900/50 dark:bg-gray-800 p-8 md:p-12 text-center shadow-2xl">
        <div class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary-600 to-transparent opacity-50"></div>
        
        <div class="relative z-10 space-y-6">
            <MugHotOutline class="w-16 h-16 text-primary-500 mx-auto animate-bounce" />
            
            <h2 class="text-3xl font-black italic uppercase text-white tracking-tighter">
                Chutná ti <span class="text-primary-500">GymRank?</span>
            </h2>
            
            <p class="text-gray-400 max-w-md mx-auto text-sm">
                Provoz serveru a databáze něco stojí. Pokud ti aplikace pomáhá sledovat progres, 
                můžeš mě podpořit nákupem jedné virtuální kávy přes Ko-fi. 
                <br><span class="text-primary-400 font-bold mt-2 block italic">Každý příspěvek mě motivuje přidávat nové funkce!</span>
            </p>

            <div class="pt-4">
                <Button 
                    href="https://ko-fi.com/X7X4UOI83" 
                    target="_blank" 
                    class="bg-[#29abe2] hover:bg-[#228dbb] text-white px-10 py-4 rounded-2xl font-black italic uppercase tracking-widest shadow-xl shadow-blue-900/20 transform hover:scale-105 transition-all"
                >
                    Podpořit přes Ko-fi
                </Button>
            </div>
            
            <p class="text-[10px] text-gray-600 uppercase tracking-widest">Bezpečné platby přes PayPal nebo Kartu</p>
        </div>
    </section>

    <footer class="text-center space-y-4 opacity-50 pb-10">
        <p class="text-xs text-gray-500 font-medium">Special thanks to SvelteKit, Drizzle ORM and Flowbite community.</p>
        <p class="text-[9px] text-gray-700 tracking-[0.5em] uppercase">© 2024 GymRank Project</p>
    </footer>
</div>