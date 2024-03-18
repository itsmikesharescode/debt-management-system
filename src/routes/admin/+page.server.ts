import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { ZodError } from "zod";
import { balancePaySchema, createAccountSchema, insertSchema } from "$lib/schemas";


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

    createAccountAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = createAccountSchema.parse(formData);


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors })
        }
    },

    insertPurchaseAction: async ({ locals, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = insertSchema.parse(formData);
            const length = Object.keys(result).length;
            let totalAmount = 0;
            for (let i = 1; i <= length / 2; i++) {
                const value = result[`productPrice${i}`];

                totalAmount += Number(value);

            };



        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors })
        }
    },

    completePayAction: async () => {
        console.log("complete pay")
    },

    balancePayAction: async ({ locals, request }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const result = balancePaySchema.parse(formData);
        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};