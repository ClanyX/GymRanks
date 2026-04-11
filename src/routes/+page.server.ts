import type { Actions } from "./$types";
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server';
import { exerciseTable, recordTable, userTable } from "$lib/server/database/schema";
import { sql, eq } from "drizzle-orm";

export const load = async() => {
    const rangQueary = await db
        .select({
            username: userTable.firstName,
            exercisename: exerciseTable.name,
            weight: recordTable.liftedWeight,
            rank: sql<number>`row_number() over (
                partition by ${recordTable.exerciseId} 
                order by ${recordTable.liftedWeight} desc
            )`.as('rank')
        })
        .from(recordTable)
        .innerJoin(userTable, eq(recordTable.userId, userTable.id))
        .innerJoin(exerciseTable, eq(recordTable.exerciseId, exerciseTable.id))
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