<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW({
		onRegistered() {
			console.log('PWA: Service Worker aktivní');
		},
		onRegisterError(error) {
			console.error('PWA: Chyba registrace', error);
		}
	});

	const show = $derived($offlineReady || $needRefresh);

	function close() {
		$offlineReady = false;
		$needRefresh = false;
	}
</script>

{#if show}
	<div 
		class="fixed bottom-0 right-0 z-100 m-4 flex max-w-sm flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
		role="alert"
	>
		<div class="text-sm text-slate-600 dark:text-slate-400">
			{#if $offlineReady}
				<p class="font-medium text-slate-900 dark:text-white">Aplikace je připravena!</p>
				<p>Nyní můžete aplikaci používat i bez připojení k internetu.</p>
			{:else}
				<p class="font-medium text-slate-900 dark:text-white">Aktualizace k dispozici!</p>
				<p>Pro získání nejnovějších funkcí a oprav je vyžadován restart.</p>
			{/if}
		</div>

		<div class="flex gap-2">
			{#if $needRefresh}
				<button 
					onclick={() => updateServiceWorker(true)}
					class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95"
				>
					Aktualizovat
				</button>
			{/if}
			<button 
				onclick={close}
				class="flex-1 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 active:scale-95 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
			>
				Zavřít
			</button>
		</div>
	</div>
{/if}