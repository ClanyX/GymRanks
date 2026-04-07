<script lang="ts">
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { DarkMode, Navbar, NavBrand, NavHamburger, NavUl, NavLi, GradientButton } from 'flowbite-svelte';
	import { page } from '$app/state';
	import { scale } from 'svelte/transition';

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
		<Navbar class="sticky inset-s-0 top-0 z-20 w-full bg-gray-200 px-2 py-2.5 sm:px-4 dark:bg-gray-800">
			<NavBrand href="/">
				<img src="logo.svg" class="me-3 h-9 sm:h-12" alt="gym-logo" />
				<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Gym Ranking</span>
			</NavBrand>
  			<div class="flex md:order-2 gap-1">
				<!-- TODO: If signed in show something else this button  -->
    			<GradientButton href="/login" pill shadow color="purpleToBlue" size="sm">PŘIHLÁSIT</GradientButton >
				<DarkMode />
    			<NavHamburger />
  			</div>
			<NavUl transition={scale} transitionParams={{ y: 0.6, duration: 300 }} { activeUrl } classes={{ active: activeClass, nonActive: nonActiveClass }}>
				<NavLi href="/">DOMŮ</NavLi>
				<NavLi href="/about">O PROJEKTU</NavLi>
			</NavUl>
		</Navbar>
	</div>
	<hr />
	<main>
	  {@render children()}
	</main>
</div>
