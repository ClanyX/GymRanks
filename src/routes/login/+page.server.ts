import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if(!email || !password) {
            //fail(400, { error: 'Email a Heslo jsou požadovány!' });
            return fail(400, { message: 'Email a Heslo jsou požadovány!' });
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if(error){
            //fail(400, { error: 'Neplatné prihlášovací udaje!' });
            return fail(400, { message: 'Neplatné prihlášovací udaje!' });
        }

        //TODO: implement page redirection after successful login
        throw redirect(303, '/');
    }
};