import { db } from '$lib/server';
import { userTable } from '$lib/server/database/schema';
import { eq } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = await locals.safeGetSession();
	if (!session) return fail(401);

	const user = await db.query.userTable.findFirst({
		where: eq(userTable.id, session.user.id)
	});

	return { userObject: user };
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		const { session } = await locals.safeGetSession();
		if (!session) return fail(401);

		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const weight = parseFloat(formData.get('weight') as string);
		const gender = formData.get('gender') as string as 'male' | 'female' | 'other';
		const dateString = formData.get('dateOfBirth') as string;

		const dateOfBirth = dateString ? new Date(dateString) : undefined;

		const correctWeight = Math.round(weight * 1000);

		const currentUser = await db.query.userTable.findFirst({
			where: eq(userTable.id, session.user.id)
		});

		if (
			currentUser?.firstName === firstName &&
			currentUser?.lastName === lastName &&
			currentUser?.weight === correctWeight &&
			currentUser?.gender === gender &&
			currentUser?.dateOfBirth?.getTime() === dateOfBirth?.getTime()
		) {
			return { success: false };
		}

		await db
			.update(userTable)
			.set({ firstName, lastName, weight: correctWeight, gender, dateOfBirth })
			.where(eq(userTable.id, session.user.id));

		return { success: true };
	}
};
