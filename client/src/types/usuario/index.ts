export type Usuario = {
    id: number
    name: string
    email: string
    enabled: boolean
    createdAt: string
    updatedAt: string
    roles: {
        idRol: number
        rol: string
    }[]
}