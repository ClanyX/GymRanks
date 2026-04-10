<script lang="ts">
	import { Select, Label, Input, Button, Card, P } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	let { data } = $props();

	let exerciseOptions = $derived(data.exercises.map((ex) => ({
		value: ex.id,
		name: ex.name,
        desc: ex.description
	})));

	let selectedExercise = $state('');
    let selectedDesc = $derived(
        data.exercises.find(ex => ex.id === selectedExercise)?.description || 'Vyber cvik pro zobrazení popisu.'
    );
</script>

<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto mt-16 lg:py-0">
	<Card class="w-full sm:max-w-md">
		<form method="POST" action="?/addRecord" use:enhance class="flex flex-col gap-4 p-3">
			<h1 class="text-2xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white mb-6">
				Zapsat výkon
			</h1>

			<div>
				<Label for="exercise" class="mb-2">Vyber cvik</Label>
				<Select
					id="exercise"
					name="exerciseId"
					items={exerciseOptions}
					bind:value={selectedExercise}
					placeholder="Hledej cvik..."
					required
				/>
			</div>

            <P>
                {selectedDesc}
            </P>

			<div>
				<Label for="weight" class="mb-2">Váha (kg)</Label>
				<Input type="number" min="0" step="0.1" name="weight" id="weight" placeholder="100" required />
			</div>

			<Button type="submit" color="dark" outline pill class="font-bold uppercase">
				Uložit záznam
			</Button>
		</form>
	</Card>
</div>
