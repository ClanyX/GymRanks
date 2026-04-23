import type { Actions } from "./$types";
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server';
import { exerciseTable, recordTable, userTable } from "$lib/server/database/schema";
import { sql, eq } from "drizzle-orm";

export const load = async() => {
    const bestPerUser = db
        .select({
            userId: recordTable.userId,
            exerciseId: recordTable.exerciseId,
            maxWeight: sql<number>`MAX(${recordTable.liftedWeight})`.as('max_weight'),
        })
        .from(recordTable)
        .groupBy(recordTable.userId, recordTable.exerciseId)
        .as('best_per_user');


    const rangQueary = await db
        .select({
            username: userTable.firstName,
            exercisename: exerciseTable.name,
            weight: bestPerUser.maxWeight,
            rank: sql<number>`row_number() over (
                partition by ${bestPerUser.exerciseId} 
                order by ${bestPerUser.maxWeight} desc
            )`.as('rank')
        })
        .from(bestPerUser)
        .innerJoin(userTable, eq(bestPerUser.userId, userTable.id))
        .innerJoin(exerciseTable, eq(bestPerUser.exerciseId, exerciseTable.id))
        .as('ranked_records');

        const top3records = await db
            .select()
            .from(rangQueary)
            .where(sql`rank <= 3`);
        
        return{
            top3records
        }
};

export const actions: Actions = {
    logout: async({ locals: { supabase } }) => {
        await supabase.auth.signOut();
        throw redirect(303, '/login');
    }
};