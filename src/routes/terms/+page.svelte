<script lang="ts">
    import { ScaleBalancedOutline, ExclamationCircleOutline, UserRemoveOutline, ShieldCheckOutline } from 'flowbite-svelte-icons';
</script>

<div class="max-w-4xl mx-auto p-6 space-y-12">
    <header class="text-center space-y-4 py-10">
        <h1 class="text-5xl md:text-6xl font-black italic uppercase tracking-tighter dark:text-white">
            Pravidla <span class="text-primary-600">Hry</span>
        </h1>
        <p class="text-gray-500 text-sm uppercase tracking-widest font-bold">Závazné podmínky používání platformy GymRank</p>
    </header>

    <div class="space-y-6">
        
        <div class="dark:bg-gray-700 border border-gray-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4">
                <ScaleBalancedOutline class="w-10 h-10 dark:text-white" />
            </div>
            <div class="relative z-10 space-y-4">
                <h2 class="text-xl font-black italic uppercase text-primary-500 flex items-center gap-3">
                    <ScaleBalancedOutline class="w-6 h-6" /> 1. Úvodní ustanovení
                </h2>
                <p class="text-gray-400 leading-relaxed italic">
                    GymRank je komunita postavená na upřímnosti a respektu k železu. Používáním této aplikace potvrzuješ, že budeš hrát fair-play a nebudeš vědomě poškozovat integritu databáze.
                </p>
            </div>
        </div>

        <div class="dark:bg-gray-700 border-2 border-red-900/30 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4">
                <ExclamationCircleOutline class="w-10 h-10 text-red-600" />
            </div>
            <div class="relative z-10 space-y-4">
                <h2 class="text-xl font-black italic uppercase text-red-600 flex items-center gap-3">
                    <ExclamationCircleOutline class="w-6 h-6" /> 2. Pravdivost údajů a rekordů
                </h2>
                <div class="space-y-4 text-gray-400">
                    <p>Uživatel se zavazuje zadávat pouze **skutečné a ověřitelné** výkony, kterých reálně dosáhl. Pokud zapíšeš rekord, musíš být schopen ho na požádání doložit (např. videem).</p>
                    <div class="bg-black/30 p-4 rounded-xl border-l-4 border-red-600">
                        <p class="text-white font-bold italic mb-2 uppercase text-xs">Administrátor má právo:</p>
                        <ul class="list-disc pl-5 space-y-1 text-sm text-gray-500">
                            <li>Smazat jakýkoliv záznam, který se jeví jako fyzikálně nereálný nebo chybný.</li>
                            <li>Zpochybnit rekord a vyžádat si důkazní materiál.</li>
                            <li>Upravit nebo smazat záznamy, které neodpovídají standardům cviku.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="dark:bg-gray-700 border border-gray-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4">
                <UserRemoveOutline class="w-10 h-10 dark:text-white" />
            </div>
            <div class="relative z-10 space-y-4">
                <h2 class="text-xl font-black italic uppercase text-orange-500 flex items-center gap-3">
                    <UserRemoveOutline class="w-6 h-6" /> 3. Zrušení účtu a blokace
                </h2>
                <p class="text-gray-400 leading-relaxed">
                    Opakované zadávání lživých údajů, urážení ostatních uživatelů nebo pokusy o zneužití systému povedou k **okamžitému a trvalému smazání účtu**. Admin má v tomto poslední slovo a není povinen blokaci zdůvodňovat.
                </p>
            </div>
        </div>

        <div class="dark:bg-gray-700 border border-gray-800 p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4">
                <ShieldCheckOutline class="w-10 h-10 dark:text-white" />
            </div>
            <div class="relative z-10 space-y-4">
                <h2 class="text-xl font-black italic uppercase text-gray-400 flex items-center gap-3">
                    <ShieldCheckOutline class="w-6 h-6" /> 4. Ochrana osobních údajů
                </h2>
                <p class="text-gray-400 leading-relaxed text-sm italic">
                    Tvoje data (váha, věk, výkony) slouží výhradně pro výpočet Wilksova skóre a tvou pozici v žebříčku. Tvé soukromí je pro nás stejně důležité jako tvoje hloubka u dřepu. Nikdy nic neprodáváme třetím stranám.
                </p>
            </div>
        </div>

    </div>

    <footer class="text-center pt-8 border-t border-gray-800">
        <p class="text-gray-600 text-[10px] uppercase tracking-[0.4em]">
            Zvedej s rozumem, piš pravdu. GymRank Team.
        </p>
    </footer>
</div>