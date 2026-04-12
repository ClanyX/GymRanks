<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Search, Label } from 'flowbite-svelte';

    let { data } = $props();

    let searchTerm = $state('');
    let selectedExercise = $state('');

    let filteredRecords = $derived(
        data.allRecords.filter(item => {
            const fullName = `${item.userInfo?.firstName} ${item.userInfo?.lastName}`.toLowerCase();
            const matchesSearch = fullName.includes(searchTerm.toLowerCase());
            const matchesExercise = selectedExercise === '' || item.exercisesInfo?.exerciseName === selectedExercise;
            return matchesSearch && matchesExercise;
        })
    );

    function calculateAge(birthDate: string | Date) {
    if (!birthDate) return '??';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    // Pokud ještě neměl narozeniny v tomto roce, odečteme jeden rok
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
    }

    const uniqueExercises = $derived([...new Set(data.allRecords.map(r => r.exercisesInfo?.exerciseName))]);
</script>

<div class="p-6 space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-gray-900  bg-gray-100 p-6 rounded-2xl border dark:border-gray-800 border-gray-300 shadow-xl">
        <div>
            <Label class="mb-2 text-gray-400 uppercase text-xs font-bold italic">Hledat sportovce</Label>
            <Search size="md" bind:value={searchTerm} placeholder="Jméno nebo příjmení..." />
        </div>

        <div>
            <Label class="mb-2 text-gray-400 uppercase text-xs font-bold italic">Filtrovat cvik</Label>
            <select 
                bind:value={selectedExercise}
                class="dark:bg-gray-800 bg-gray-100 dark:border-gray-800 border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 outline-none"
            >
                <option value="">Všechny cviky</option>
                {#each uniqueExercises as ex (ex)}
                    <option value={ex}>{ex}</option>
                {/each}
            </select>
        </div>
        <!-- TODO: add more filters -->
    </div>

    <div class="rounded-2xl overflow-hidden border dark:border-gray-800 border-gray-300 shadow-2xl">
        <Table hoverable={true}>
            <TableHead class="dark:bg-gray-800/50 bg-gray-300/50 dark:text-gray-300 text-gray-800 uppercase text-[10px] tracking-widest">
                <TableHeadCell>Sportovec</TableHeadCell>
                <TableHeadCell>Cvik</TableHeadCell>
                <TableHeadCell class="text-right">Váha</TableHeadCell>
                <TableHeadCell class="text-right px-8">Datum</TableHeadCell>
            </TableHead>
            <TableBody>
                {#each filteredRecords as item (item)}
                    <TableBodyRow class="border-b border-gray-800 dark:hover:bg-gray-500/30 hover:bg-gray-300/30 transition-colors">
                        <TableBodyCell>
                            <div class="flex flex-col">
                                <span class="font-bold dark:text-gray-200 text-gray-600">
                                    {item.userInfo?.firstName} {item.userInfo?.lastName}
                                </span>
                                <span class="text-[10px] text-gray-500 uppercase">
                                    {item.userInfo?.gender} • Váha: {(item.userInfo?.weight ?? 0) / 1000} kg • Věk: {calculateAge(item.userInfo?.age ?? '')} let
                                </span>
                            </div>
                        </TableBodyCell>

                        <TableBodyCell>
                            <span class="px-2 py-1 rounded bg-primary-950/50 text-primary-400 text-[10px] font-black uppercase italic border border-primary-900/50">
                                {item.exercisesInfo?.exerciseName}
                            </span>
                        </TableBodyCell>

                        <TableBodyCell class="text-right font-black italic text-2xl tracking-tighter dark:text-white text-gray-600">
                            {item.recordInfo.liftedWeight / 1000} <span class="text-[12px] tracking-normal text-gray-500 ml-0.5">kg</span>
                        </TableBodyCell>

                        <TableBodyCell class="text-right text-xs text-gray-500 font-medium px-8">
                            {new Date(item.recordInfo.addedAt).toLocaleDateString('cs-CZ')}
                        </TableBodyCell>
                    </TableBodyRow>
                {:else}
                    <TableBodyRow>
                        <TableBodyCell colspan={4} class="text-center py-20 text-gray-600 italic">
                            Nebyl nalezen žádný záznam...
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>
</div>