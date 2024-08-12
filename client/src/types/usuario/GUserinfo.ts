// Info de cuenta de google

export type GUserinfo = {
    email: string,
    id: string,
    picture: string,
    verified_email: boolean
}

export type GUserinfoResponse = {
    status : "Authorized" | "Unauthorized",
    user: GUserinfo | null
}