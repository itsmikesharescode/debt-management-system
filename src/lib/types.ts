export type UserListTB = {
    id: number
    created_at: string
    user_id: string
    user_fullname: string
    gender: string
}

export type ResultModel<T> = {
    status: number
    type: string
    data: T
}