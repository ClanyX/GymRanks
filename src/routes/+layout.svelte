<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase.js';
	import { DarkMode, Navbar, NavBrand, NavHamburger, NavUl, NavLi, GradientButton } from 'flowbite-svelte';
	import { page } from '$app/state';
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let activeUrl = $derived(page.url.pathname);
	let activeClass = "font-bold text-gray-700 bg-gray-300 dark:text-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-700 md:hover:bg-transparent md:dark:hover:bg-transparent md:text-gray-700 md:dark:text-white ";
  	let nonActiveClass = "text-gray-700 dark:text-gray-400 dark:hover:text-gray-400 hover:bg-transparent dark:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-400 ";

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
	<link rel="apple-touch-icon" sizes="192x192" href="favicon.ico" />
	<!-- TODO: Add favicon -->
</svelte:head>

<div class="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-200">
	<div class="relative">
		<Navbar class="fixed inset-x-0 top-0 z-50 w-full border-b border-gray-300 bg-gray-200/95 px-2 py-2.5 backdrop-blur-sm sm:px-4 dark:border-gray-700 dark:bg-gray-800/95">
			<NavBrand href="/">
				<img src="/logo.svg" class="me-3 h-9 sm:h-12" alt="gym-logo" />
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Gym Ranking</span>
			</NavBrand>
  			<div class="flex md:order-2 gap-1">
				{#if !session}
	    			<GradientButton href="/login" pill shadow color="purpleToBlue" size="sm">PŘIHLÁSIT</GradientButton >
				{:else}
					<form method="POST" action="/?/logout" use:enhance>
	    				<GradientButton type="submit" pill shadow color="purpleToBlue" size="sm">
	        				Odhlásit se
	    				</GradientButton>
					</form>
				{/if}
				<DarkMode />
    			<NavHamburger />
  			</div>
			<NavUl transition={scale} transitionParams={{ y: 0.6, duration: 300 }} { activeUrl } classes={{ active: activeClass, nonActive: nonActiveClass }}>
				<NavLi href="/">DOMŮ</NavLi>
				<NavLi href="/about">O PROJEKTU</NavLi>
				<NavLi href="/contact">KONTAKT & PODPORA</NavLi>
				<NavLi href="/credits">CREDITS</NavLi>
			</NavUl>
		</Navbar>
	</div>
	<div class="h-19 sm:h-22"></div>
	<main class="pt-2">
	  {@render children()}
	</main>
</div>
