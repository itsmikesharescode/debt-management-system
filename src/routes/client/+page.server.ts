import { redirect, type Actions, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { clientUpdateAccountSchema } from "$lib/schemas";
import type { ZodError } from "zod";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { NetAmountTB, PaymentHistoryTB, PurchaseListTB } from "$lib/types";
import { convertStringToObject } from "$lib/helpers";



export const load: PageServerLoad = async ({ locals: { isLogged, supabase } }) => {

    const checkUser = await isLogged();

    if (checkUser) {
        const { data: { user }, error: checkError } = checkUser;
        if (checkError) return;
        else {
            if (user?.user_metadata.role !== "client") throw redirect(302, "/admin");

            const { data: purchaseList, error: purchaseListError } = await supabase.from("purchase_list_tb").select("*").eq("user_id", user.id);
            const newPurchaseList = purchaseList?.map(item => {
                return {
                    id: item.id,
                    created_at: item.created_at,
                    user_id: item.user_id,
                    purchase_products_with_price: JSON.parse(item.purchase_products_with_price),
                    user_email: item.user_email,
                    user_fullname: item.user_fullname,
                    total_amount: item.total_amount
                }
            });

            const { data: paymentHistoryList, error: paymentHistoryListError } = await supabase.from("payment_record_tb").select("*").eq("user_id", user.id);
            const newPaymentHistoryList = paymentHistoryList?.map(item => {
                return {
                    id: item.id,
                    created_at: item.created_at,
                    user_id: item.user_id,
                    payment_mode: item.payment_mode,
                    payment_amount: item.payment_amount,
                    purchase_history: item.purchase_history ? convertStringToObject(item.purchase_history) : null
                }
            });

            return {
                user,
                purchaseList: newPurchaseList as PurchaseListTB[],
                paymentHistoryList: newPaymentHistoryList as PaymentHistoryTB[],
                amountObj: await supabase.from("net_total_amount_tb").select("*").eq("user_id", user.id).limit(1).single() as PostgrestSingleResponse<NetAmountTB>
            };
        }
    } else throw redirect(302, "/");

};


export const actions: Actions = {
    logoutAction: async ({ locals: { supabase } }) => {

        const { error: logoutError } = await supabase.auth.signOut();
        if (logoutError) return fail(401, { msg: logoutError.message });
        else return fail(200, { msg: "Logout success." });
    },

    updateAccountAction: async ({ locals: { supabase }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = clientUpdateAccountSchema.parse(formData);

            const { data: { user }, error: updatePassError } = await supabase.auth.updateUser({
                password: result.newPass
            });

            if (updatePassError) return fail(401, { msg: updatePassError.message });
            else if (user) return fail(200, { msg: "Password Updated!" });

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    }
};