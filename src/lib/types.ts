export type UserListTB = {
    id: number
    created_at: string
    user_id: string
    user_email: string
    user_fullname: string
    gender: string
}

export type NetAmountTB = {
    id: number
    created_at: string
    user_id: string
    total_amount: number
    prev_amount: number
    latest_amount: number
}

export type PurchaseListTB = {
    id: number
    created_at: string
    user_id: string
    purchase_products_with_price: {
        [key: string]: string
    }
    user_email: string
    user_fullname: string
    total_amount: number
}

export type PaymentHistoryTB = {
    id: number
    create_at: string
    user_id: string
    payment_mode: string
    payment_amount: number
    purchase_history: {
        [key: string]: string
    }
}

export type ResultModel<T> = {
    status: number
    type: string
    data: T
}