import { Usuario } from "@/types/usuario"
import { Proyecto } from "@/types/proyecto/index"
import { EntregableProyecto } from "../EntregableProyecto"
import { Cliente } from "@/types/cliente"

export type Recurso = {
    idRecurso?: number
    titulo: string
    enlace?: string
    activo: boolean
    esArchivo: boolean
    createdAt?: string
    propietario?: Usuario
    proyectoAsociado: Proyecto
    entregableAsociado?: EntregableProyecto
    clienteAsociado?: Cliente
}