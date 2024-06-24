import { Rol } from '@/types/rol'

export * from './UsuarioDto'

export type Usuario = {
    id: number
    name: string
    email: string
    enabled: boolean
    createdAt: string
    updatedAt: string
    roles: Rol[]
}