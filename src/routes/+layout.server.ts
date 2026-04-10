import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/';
import { userTable } from '$lib/server/database/schema';
import { eq } from 'drizzle-orm';

// This load function runs on the server for every page load. It retrieves the user's session and information, as well as all cookies, and makes them available to the layout and its child components.
export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  const { session, user, userData } = await safeGetSession();

  if(!session) {
    return{
      session,
      user,
      userData,
      cookies: cookies.getAll(),
    }
  }

  const userDB = await db
    .select()
    .from(userTable)
    .where(eq(userTable.id, session.user.id))
    .then(res => res[0]);

  return {
    session,
    user,
    userData: userDB,
    cookies: cookies.getAll(),
  };
};

