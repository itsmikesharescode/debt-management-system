import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { ZodError } from "zod";
import { balancePaySchema, createAccountSchema, insertSchema } from "$lib/schemas";
import type { PostgrestError } from "@supabase/supabase-js";
import type { NetAmountTB, PurchaseListTB, UserListTB } from "$lib/types";
import { convertStringToObject } from "$lib/helpers";


export const load: PageServerLoad = async ({ locals: { isLogged, supabase }, }) => {
    const checkUser = await isLogged();

    if (checkUser) {
        const { data: { user }, error: checkError } = checkUser;
        if (checkError) return;
        else {
            if (user?.user_metadata.role !== "admin") throw redirect(302, "/client");

            const { data: clientList, error: clientListError } = await supabase.rpc("get_clients") as { data: UserListTB[], error: PostgrestError | null };

            return { user, clientList };
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

        try {
            const result = createAccountSchema.parse(formData);

            const { data: { user }, error: createAccountError } = await supabaseAdmin.auth.admin.createUser({
                email: result.email,
                password: result.password,
                user_metadata: {
                    gender: result.gender,
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
                    user_email: user.email,
                    user_fullname: user.user_metadata.fullName,
                    gender: user.user_metadata.gender
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

    insertPurchaseAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        const { clientRef } = formData;



        try {
            const result = insertSchema.parse(formData);
            const convertedClientRef = JSON.parse(clientRef as string) as UserListTB;
            delete result.clientRef;

            const length = Object.keys(result).length;
            let totalAmount = 0;
            for (let i = 1; i <= length / 2; i++) {
                const value = result[`productPrice${i}`];

                totalAmount += Number(value);

            };

            const { error: insertPutchaseError } = await supabase.rpc("insert_purchase", {
                user_id_input: convertedClientRef.user_id,
                user_email_input: convertedClientRef.user_email,
                user_fullname_input: convertedClientRef.user_fullname,
                purchase_products_with_price_input: JSON.stringify(result),
                total_amount_input: totalAmount,
                purchase_length_input: length / 2
            });

            if (insertPutchaseError) return fail(401, { msg: insertPutchaseError.message });
            else return fail(200, { msg: "Purchase Inserted." })


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors })
        }
    },


    purchaseHistoryAction: async ({ locals: { supabase }, request }) => {
        const formData = await request.formData();
        const userId = formData.get("userId") as string;

        const { data: purchaseList, error: purchaseListError } = await supabase.from("purchase_list_tb")
            .select("*").eq("user_id", userId)

        if (purchaseListError) return fail(401, { msg: purchaseListError.message });
        else if (purchaseList) {
            const { data: amounts, error: amountsError } = await supabase.from("net_total_amount_tb")
                .select("*").eq("user_id", userId).limit(1).single() as { data: NetAmountTB, error: PostgrestError | null };

            if (amountsError) return fail(401, { msg: amountsError.message });


            const newPurchaseList = purchaseList.map((item) => {
                return {
                    id: item.id,
                    created_at: item.created_at,
                    user_id: item.user_id,
                    purchase_products_with_price: JSON.parse(item.purchase_products_with_price),
                    user_email: item.user_email,
                    user_fullname: item.user_fullname,
                    total_amount: item.total_amount
                }
            })

            return fail(200, { purchaseList: newPurchaseList, amounts });

        }
    },

    completePayAction: async ({ locals: { supabase }, request }) => {
        const formData = await request.formData();
        const userId = formData.get("userId") as string;

        const { data: amounts, error: balancePaymentError } = await supabase.rpc("payment_mode", {
            payment_mode_input: "complete",
            user_id_input: userId,
            payment_amount_input: 0,
        }) as { data: NetAmountTB[], error: PostgrestError | null };

        if (balancePaymentError) return fail(401, { msg: balancePaymentError.message });
        else if (amounts) return fail(200, { msg: "Complete Payment Success." });

    },

    balancePayAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const result = balancePaySchema.parse(formData);

            const { data: amounts, error: balancePaymentError } = await supabase.rpc("payment_mode", {
                payment_mode_input: "balance",
                user_id_input: result.userId,
                payment_amount_input: result.balanceAmount
            }) as { data: NetAmountTB[], error: PostgrestError | null };

            if (balancePaymentError) return fail(401, { msg: balancePaymentError.message });
            else if (amounts) return fail(200, { msg: "Balance Payment Success.", amounts });



        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    paymentHistoryAction: async ({ locals: { supabase }, request }) => {
        const formData = await request.formData();
        const userId = formData.get("userId") as string;

        const { data: paymentHistoryList, error: paymentHistoryListError } = await supabase.from("payment_record_tb").select("*").eq("user_id", userId);

        if (paymentHistoryListError) return fail(401, { msg: paymentHistoryListError.message });
        else if (paymentHistoryList) {

            const newPaymentHistoryList = paymentHistoryList.map(item => {
                return {
                    id: item.id,
                    created_at: item.created_at,
                    user_id: item.user_id,
                    payment_mode: item.payment_mode,
                    payment_amount: item.payment_amount,
                    purchase_history: item.purchase_history ? convertStringToObject(item.purchase_history) : null
                }
            });

            return fail(200, { paymentList: newPaymentHistoryList });
        }
    }
};