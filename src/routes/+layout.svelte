<svelte:head>
	<link rel="apple-touch-icon" sizes="192x192" href="/pwa-192x192.png">
	<!-- TODO: Add favicon -->
</svelte:head>

<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
  	import { supabase } from '$lib/supabase';

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

<div>
  {@render children()}
</div>
