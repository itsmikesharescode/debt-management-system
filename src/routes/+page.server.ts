import { loginSchema } from "$lib/schemas";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { ZodError } from "zod";
import type { PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ locals: { isLogged, supabase } }) => {

    const checkUser = await isLogged();

    if (checkUser) {
        const { data: { user }, error: checkError } = checkUser;
        if (checkError) return;
        else {
            if (user?.user_metadata.role === "admin") throw redirect(302, "/admin");
            else if (user?.user_metadata.role === "client") throw redirect(302, "/client");
        }
    }

};

export const actions: Actions = {
    loginAction: async ({ locals: { supabase }, cookies, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = loginSchema.parse(formData);
            const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                email: result.email,
                password: result.password
            });

            if (loginError) return fail(401, { msg: loginError.message });
            else if (loginData) return fail(200, { msg: "Login success.", user: loginData.user });

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });

        }
    }
};