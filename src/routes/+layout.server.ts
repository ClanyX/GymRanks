import type { LayoutServerLoad } from './$types';

// This load function runs on the server for every page load. It retrieves the user's session and information, as well as all cookies, and makes them available to the layout and its child components.
export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session, user } = await safeGetSession();
  return {
    session,
    user,
    cookies: cookies.getAll(),
  };
};