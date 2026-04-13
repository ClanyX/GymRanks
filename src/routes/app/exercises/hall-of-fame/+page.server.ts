import { db } from '$lib/server/';
import { recordTable, userTable, exerciseTable } from '$lib/server/database/schema';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { session } = await locals.safeGetSession();
    const currentUserId = session?.user?.id;

    const allRecords = await db
        .select({
            userId: userTable.id,
            userName: userTable.firstName,
            userLastName: userTable.lastName,
            userGender: userTable.gender,
            userAge: userTable.dateOfBirth,
            userWeight: userTable.weight,
            exerciseName: exerciseTable.name,
            weight: recordTable.liftedWeight,
            rank: sql<number>`row_number() over (
                partition by ${recordTable.exerciseId} 
                order by ${recordTable.liftedWeight} desc
            )`.as('rank')
        })
        .from(recordTable)
        .leftJoin(userTable, eq(recordTable.userId, userTable.id))
        .leftJoin(exerciseTable, eq(recordTable.exerciseId, exerciseTable.id));

    return {
        allRecords,
        currentUserId,
    };
}