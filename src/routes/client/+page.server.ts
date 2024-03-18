import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { clientUpdateAccountSchema } from "$lib/schemas";
import type { ZodError } from "zod";


export const load: PageServerLoad = async ({ locals: { isLogged } }) => {
    const checkUser = await isLogged();

    if (checkUser) {
        const { data: { user }, error: checkError } = checkUser;
        if (checkError) return;
        else {
            if (user?.user_metadata.role !== "client") throw redirect(302, "/admin");

            return { user };
        }
    } else throw redirect(302, "/");


};


export const actions: Actions = {
    logoutAction: async ({ locals: { supabase } }) => {

        const { error: logoutError } = await supabase.auth.signOut();
        if (logoutError) return fail(401, { msg: logoutError.message });
        else return fail(200, { msg: "Logout success." });
    },

    updateAccountAction: async ({ locals, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = clientUpdateAccountSchema.parse(formData);
        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors })
        }
    }
};