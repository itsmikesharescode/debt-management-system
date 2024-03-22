import type { User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";
import { type Writable, writable } from "svelte/store";
import type { NetAmountTB, PaymentHistoryTB, PurchaseListTB } from "./types";


export const setUser = (userValue: User | null) => {
    let user = writable<User | null>(userValue);

    setContext("user", user);
}

export const getUser = () => {
    return getContext<Writable<User | null>>("user");
}

export const formatDate = (dateVal: string) => {
    const parsedDate = new Date(dateVal);

    const months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];
    const hours = parsedDate.getHours();
    const minutes = parsedDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${months[parsedDate.getMonth()]} ${parsedDate.getDate()} ${parsedDate.getFullYear()} @ ${formattedHours}:${formattedMinutes} ${ampm}`;
}


export const clientAmounts = writable<NetAmountTB | null>(null);
export const clientPurchaseList = writable<PurchaseListTB[] | null>(null);
export const clientPaymentList = writable<PaymentHistoryTB[] | null>(null);


export const clientFolderControls = writable({
    showInsertPurchase: false,
    showPurchaseHistory: false,
    showPaymentHistory: false,
    showUpdateInformation: false,

});

export const paymentControls = writable({
    showCompletePay: false,
    showBalancePay: false
})