import { redirect } from "@sveltejs/kit";
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