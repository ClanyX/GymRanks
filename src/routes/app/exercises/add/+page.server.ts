import { db } from '$lib/server/';
import { exerciseTable, recordTable } from '$lib/server/database/schema';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
    const exercises = await db.select().from(exerciseTable);
    return {
        exercises
    };
};

export const actions: Actions = {
    addRecord: async ({ request, locals }) => {
        const { session } = await locals.safeGetSession();
        if (!session) return fail(401);

        const formData = await request.formData();
        const exerciseId = formData.get('exerciseId') as string;
        const weight = formData.get('weight') as string;

        const weightInGrams = Math.round(parseFloat(weight) * 1000);

        await db.insert(recordTable).values({
            userId: session.user.id,
            exerciseId,
            liftedWeight: weightInGrams,
            addedAt: new Date(),
        });

        /* Redirect to records page */
        throw redirect(303, '/app/dashboard');
    }
};