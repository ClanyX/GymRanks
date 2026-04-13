<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import { AwardSolid, AwardOutline, UserCircleOutline } from 'flowbite-svelte-icons';

    let { data } = $props();

    const grouped = $derived(
        data.allRecords.reduce((acc, record) => {
            if(!acc[record.exerciseName ?? '']) {
                acc[record.exerciseName ?? ''] = [];
            }
            acc[record.exerciseName ?? ''].push(record);
            return acc;
        }, {} as Record<string, typeof data.allRecords>),
    );
</script>

<div class="p-2 md:p-6 space-y-12">
    {#each Object.entries(grouped) as [name, records] (name)}
        {@const myRank = records.find(r => r.userId === data.currentUserId)?.rank}
        <section class="space-y-4">
            <h2 class="text-2xl font-black italic uppercase flex justify-between items-center">
                <span>{name}</span>
                {#if myRank}
                    <span class="text-[15px] bg-primary-600 px-3 py-1 rounded-full not-italic tracking-normal">
                        Tvoje pozice: #{myRank}
                    </span>
                {/if}
            </h2>

            <div class="rounded-2xl overflow-hidden border dark:bg-gray-800 bg-gray-100 dark:border-gray-800 border-gray-300">
                <Table>
                    <TableHead class="dark:bg-gray-900/60 bg-gray-300/50 dark:text-gray-300 text-gray-800 uppercase text-[10px]">
                        <TableHeadCell class="w-16 text-center">Rank</TableHeadCell>
                        <TableHeadCell>Zvedač</TableHeadCell>
                        <TableHeadCell>Info</TableHeadCell>
                        <TableHeadCell class="text-right">Váha</TableHeadCell>
                    </TableHead>
                    <TableBody>
                    <!-- TODO: remove duplication and set max limit of records -->
                        {#each records as record (record)}
                            {@const isMe = record.userId === data.currentUserId}
                            
                            <TableBodyRow class={isMe ? 'bg-gray-300/20 dark:bg-gray-600/30 border-y border-primary-900/50 dark:border-primary-600' : 'border-b border-gray-800/50'}>
                                <TableBodyCell class="text-center">
                                    <div class="flex justify-center">
                                        {#if record.rank == 1}
                                            <AwardSolid class="w-5 h-5 text-yellow-400" />
                                        {:else if record.rank == 2}
                                            <AwardOutline class="w-5 h-5 dark:text-gray-200 text-gray-500" />   
                                        {:else if record.rank == 3}
                                            <AwardOutline class="w-5 h-5 text-orange-500" />
                                        {:else}
                                            <span class="text-xs font-bold {isMe ? 'text-gray-400' : 'text-gray-600'}">
                                                #{record.rank}
                                            </span>
                                        {/if}
                                    </div>
                                </TableBodyCell>

                                <TableBodyCell class="font-bold {isMe ? 'dark:text-white' : 'text-gray-400'}">
                                    <div class="flex items-center gap-2">
                                        {record.userLastName}
                                        {#if isMe}
                                            <UserCircleOutline class="w-4 h-4 text-primary-500" />
                                        {/if}
                                    </div>
                                </TableBodyCell>

                                <TableBodyCell>
                                    <div class="text-sm text-gray-500">
                                        {record.userName} | {(record.userGender?.at(0)?.toUpperCase())}{record.userGender?.slice(1)} <span class="invisible md:visible">|</span> <br class="md:hidden" /> {record.userAge ? Math.floor((Date.now() - new Date(record.userAge).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 'N/A'} let | {record.userWeight ? record.userWeight / 1000 : 'N/A'} kg
                                    </div>
                                </TableBodyCell>

                                <TableBodyCell class="text-right font-black text-xl tracking-tighter">
                                    <span class="{record.rank == 1 ? 'text-yellow-400' : isMe ? 'dark:text-white' : 'text-gray-500'}">
                                        <!-- TODO: add flout units -->
                                        {(record.weight / 1000).toFixed(0)} kg
                                    </span>
                                </TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                </Table>
            </div>
        </section>
    {/each}
</div>