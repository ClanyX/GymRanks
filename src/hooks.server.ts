// Import Supabase authentication helpers for SvelteKit server-side usage
import { createServerClient } from '@supabase/auth-helpers-sveltekit';
// Import SvelteKit server hooks and redirect utility
import { type Handle, redirect } from '@sveltejs/kit';
// Import sequence utility to chain multiple middleware hooks together
import { sequence } from '@sveltejs/kit/hooks';
// Import public environment variables (these are exposed to both server and client)
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY } from '$env/static/public';

//TODO: delete, just for dev
import { dev } from '$app/environment';

/**
 * SUPABASE MIDDLEWARE HOOK
 * Initializes the Supabase client for each request and sets up session management.
 * This runs on every server request to provide authentication context.
 */
const supabase: Handle = async ({ event, resolve }) => {
  // Create a Supabase client that manages authentication on the server side
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY, {
    // Configure cookie handling - necessary for maintaining authenticated sessions
    cookies: {
      // Retrieves all cookies from the incoming request
      getAll: () => event.cookies.getAll(),
      // Sets cookies in the response (used to maintain auth tokens)
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          //TODO: delete -> secure: !dev
          event.cookies.set(name, value, { ...options, path: '/', secure: !dev });
        });
      },
    },
  });

  /**
   * Helper function to safely get the current user's session and user data.
   * Returns both session and user, or null values if not authenticated or error occurs.
   */
  event.locals.safeGetSession = async () => {
    // First, fetch the active session from Supabase
    const { data: { session } } = await event.locals.supabase.auth.getSession();
    if (!session) return { session: null, user: null };

    // Then, fetch the authenticated user details
    const { data: { user }, error } = await event.locals.supabase.auth.getUser();
    if (error) {
      // If there's an error fetching user (e.g., token expired), return null values
      return { session: null, user: null };
    }

    // Return both session and user data if everything is valid
    return { session, user };
  };

  return resolve(event, {
    // Filter response headers - only allow these specific headers to be serialized
    // This improves security by controlling what data gets sent to the client
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-parse-le';
    },
  });
};

/**
 * AUTHENTICATION GUARD MIDDLEWARE HOOK
 * Protects routes by redirecting unauthenticated users away from protected pages
 * and redirecting authenticated users away from login pages.
 */
const authGuard: Handle = async ({ event, resolve }) => {
  // Get the current session using the helper function defined above
  const { session } = await event.locals.safeGetSession();

  //TODO: implement role-based access control (e.g., only allow admins to access certain routes)
  //TODO: implement secure pages
  
  // If user is NOT logged in AND trying to access /app routes, redirect to login
  if (!session && event.url.pathname.startsWith('/app')) {
    throw redirect(303, '/login');
  }
  
  // If user IS logged in AND trying to access the login page, redirect to dashboard
  if (session && event.url.pathname === '/login') {
    throw redirect(303, '/app');
  }

  return resolve(event);
};

/**
 * EXPORT COMBINED MIDDLEWARE
 * The 'sequence' function chains the hooks together so both run in order:
 * 1. supabase hook - initializes Supabase and session handling
 * 2. authGuard hook - enforces authentication rules
 */
export const handle = sequence(supabase, authGuard);