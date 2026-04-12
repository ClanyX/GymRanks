import { db } from '$lib/server/';
import { recordTable, userTable, exerciseTable } from '$lib/server/database/schema';
import { eq, desc } from 'drizzle-orm';

export const load = async () => {
    const allRecords = await db
        .select({
            userInfo: {
                userId: userTable.id,
                firstName: userTable.firstName,
                lastName: userTable.lastName,
                gender: userTable.gender,
                age: userTable.dateOfBirth,
                weight: userTable.weight,
                lastSignInAt: userTable.lastSignInAt,
            },
            exercisesInfo: {
                exerciseId: exerciseTable.id,
                exerciseName: exerciseTable.name,
            },
            recordInfo: {
                liftedWeight: recordTable.liftedWeight,
                addedAt: recordTable.addedAt,
            }
        })
        .from(recordTable)
        .leftJoin(userTable, eq(recordTable.userId, userTable.id))
        .leftJoin(exerciseTable, eq(recordTable.exerciseId, exerciseTable.id))
        .orderBy(desc(recordTable.addedAt));

    return {
        allRecords
    };
}