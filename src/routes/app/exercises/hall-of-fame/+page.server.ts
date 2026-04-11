import { db } from '$lib/server/';
import { recordTable, userTable, exerciseTable } from '$lib/server/database/schema';
import { eq, desc, max } from 'drizzle-orm';

export const load = async () => {
    // 1. Načteme všechny cviky, abychom mohli tvořit sekce
    const allExercises = await db.select().from(exerciseTable);

    // 2. Načteme nejlepší výkony všech uživatelů u všech cviků
    const allRecords = await db
        .select({
            userId: userTable.id,
            username: userTable.firstName && " " && userTable.lastName,
            exerciseId: exerciseTable.id,
            exerciseName: exerciseTable.name,
            weight: max(recordTable.liftedWeight),
        })
        .from(recordTable)
        .innerJoin(userTable, eq(recordTable.userId, userTable.id))
        .innerJoin(exerciseTable, eq(recordTable.exerciseId, exerciseTable.id))
        .groupBy(userTable.id, userTable.lastName, userTable.firstName, exerciseTable.id, exerciseTable.name)
        .orderBy(desc(max(recordTable.liftedWeight)));

    return {
        allExercises,
        allRecords
    };
};