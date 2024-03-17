import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";


export const load: PageServerLoad = async ({ locals: { isLogged }, }) => {
    const checkUser = await isLogged();

    if (checkUser) {
        const { data: { user }, error: checkError } = checkUser;
        if (checkError) return;
        else {
            if (user?.user_metadata.role !== "admin") throw redirect(302, "/client");

            return { user };
        }
    } else throw redirect(302, "/");
};


export const actions: Actions = {
    logoutAction: async ({ locals: { supabase } }) => {

        const { error: logoutError } = await supabase.auth.signOut();

        if (logoutError) fail(401, { msg: logoutError.message });
        else return fail(200, { msg: "Logout success." })
    },

    createAccountAction: async () => {

    }
};