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

    createAccountAction: async ({ locals: { supabaseAdmin, supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        console.log(formData)

        try {
            const result = createAccountSchema.parse(formData);

            const { data: { user }, error: createAccountError } = await supabaseAdmin.auth.admin.createUser({
                email: result.email,
                password: result.password,
                user_metadata: {
                    role: "client",
                    fullName: result.completeName
                },
                email_confirm: true
            });

            if (createAccountError) return fail(401, { msg: createAccountError.message });
            else if (user) {
                const { error: insertUserError } = await supabase.from("user_list_tb").insert([{
                    user_id: user.id,
                    role_name: user.user_metadata.role,
                    user_fullname: user.user_metadata.fullName
                }]);

                if (insertUserError) return fail(401, { msg: insertUserError.message });
                else return fail(200, { msg: "Account Created." });
            };


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