<script lang="ts">
  import { Card, Button, Badge, Heading, P } from 'flowbite-svelte';
  import { PlusOutline, ChartLineUpOutline, AwardOutline } from 'flowbite-svelte-icons';

  let { data } = $props();
</script>

<div class="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
  
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <div>
      <Heading tag="h2" class="text-3xl font-black italic uppercase tracking-tighter">
        Ahoj, {data.userData?.firstName}! 👋
      </Heading>
      <P color="text-gray-500 dark:text-gray-400 italic">Dneska je skvělý den na nový osobák.</P>
    </div>
    <Button href="/app/exercises/add" color="alternative" class="dark:bg-gray-700 dark:text-white hover:dark:bg-gray-600 bg-gray-100 hover:bg-gray-200 font-bold uppercase tracking-widest italic shadow-lg shadow-primary-500/30">
      <PlusOutline class="w-5 h-5 mr-2" /> Nový záznam
    </Button>
  </div>

  <hr class="border-gray-200 dark:border-gray-800" />

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- TODO: add rank -->
    <Card class="bg-linear-to-br dark:from-gray-950 dark:to-gray-800 from-gray-100 to-gray-200 border-gray-200 shadow-xl relative overflow-hidden p-2">
      <div class="relative z-10">
        <h3 class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Tvůj Rank</h3>
        <p class="text-3xl font-black dark:text-white text-black italic uppercase">Silver II</p>
      </div>
      <AwardOutline class="absolute -right-4 -bottom-4 w-24 h-24 dark:text-white/10 text-black/10 rotate-12" />
    </Card>

    <Card>
      <h3 class="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Celkem zvednuto</h3>
      <p class="text-3xl font-black text-gray-900 dark:text-white italic">12 450 <span class="text-sm">kg</span></p>
      <Badge color="green" class="mt-2 w-fit italic">+12% vs minulý týden</Badge>
    </Card>

    <!-- TODO: stats -->
    <Card>
      <h3 class="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Tréninky (měsíc)</h3>
      <p class="text-3xl font-black text-gray-900 dark:text-white italic">14</p>
      <div class="flex gap-1 mt-3">
          <!-- {#each Array.from({ length: 7 }) as _, index (index)}
            <div class="w-full h-2 rounded-sm {index < 2 ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}"></div>
          {/each} -->
      </div>
    </Card>
  </div>

  <div class="mt-8">
    <div class="flex items-center gap-2 mb-4">
        <ChartLineUpOutline class="w-6 h-6 text-primary-600" />
        <h3 class="text-xl font-black italic uppercase tracking-tight dark:text-white">Moje Maximálky (PRs)</h3>
    </div>
    <!-- TODO: replace with real data and foreach loop with databse -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <span class="font-bold text-gray-700 dark:text-gray-300">Bench Press</span>
        <span class="text-2xl font-black text-primary-600 italic">105 kg</span>
      </div>
      <div class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <span class="font-bold text-gray-700 dark:text-gray-300">Squat</span>
        <span class="text-2xl font-black text-primary-600 italic">140 kg</span>
      </div>
      <div class="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <span class="font-bold text-gray-700 dark:text-gray-300">Deadlift</span>
        <span class="text-2xl font-black text-primary-600 italic">180 kg</span>
      </div>
    </div>
  </div>

</div>