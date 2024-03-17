import type { User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";
import { type Writable, writable } from "svelte/store";


export const setUser = (userValue: User | null) => {
    let user = writable<User | null>(userValue);

    setContext("user", user);
}

export const getUser = () => {
    return getContext<Writable<User | null>>("user");
}