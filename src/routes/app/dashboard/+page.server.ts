import { db } from '$lib/server/';
import { exerciseTable, recordTable } from '$lib/server/database/schema';
import { fail } from '@sveltejs/kit';
import { eq, max, desc } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.safeGetSession();
    if (!session) return fail(401);

    const exercisesMax = await db
        .select({
            exerciseName: exerciseTable.name,
            maxWeight: max(recordTable.liftedWeight)
        })
        .from(recordTable)
        .innerJoin(exerciseTable, eq(recordTable.exerciseId, exerciseTable.id))
        .where(eq(recordTable.userId, session.user.id))
        .groupBy(exerciseTable.name);

    const latestRecord = await db
        .select({
            exerciseName: exerciseTable.name,
            weight: recordTable.liftedWeight,
            date: recordTable.addedAt,
        })
        .from(recordTable)
        .innerJoin(exerciseTable, eq(recordTable.exerciseId, exerciseTable.id))
        .where(eq(recordTable.userId, session.user.id))
        .orderBy(desc(recordTable.addedAt))
        .limit(1)
        .then(res => res[0] ?? null);

    return { exercisesMax, latestRecord };
};