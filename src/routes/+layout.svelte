<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { DarkMode } from 'flowbite-svelte';

	let { data, children } = $props();
	let session = $derived(data.session);

	// Listen for changes to the user's authentication state and invalidate the session data when it changes
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="192x192" href="/pwa-192x192.png" />
	<!-- TODO: Add favicon -->
</svelte:head>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200">
	<header class="p-4 border-b dark:border-gray-700 flex justify-between items-center">
		<span class="font-bold">GYM APP</span>

		<DarkMode />
	</header>
	<main>
		{@render children()}
	</main>
</div>
