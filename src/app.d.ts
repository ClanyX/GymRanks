import { SupabaseClient, Session, User } from '@supabase/supabase-js';
import type { InferSelectModel } from 'drizzle-orm';

type UserRow = InferSelectModel<typeof import('$lib/server/database/schema').userTable>;

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null; userData: UserRow | null }>;
		}
		interface PageData {
			session: Session | null;
			user: User | null;
			userData: UserRow | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
