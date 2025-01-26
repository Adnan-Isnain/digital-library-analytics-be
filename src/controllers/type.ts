export interface IUser {
    email: string
    password: string
    role: string 
}

export interface IRequest {
    page?: number
    limit?: number
}