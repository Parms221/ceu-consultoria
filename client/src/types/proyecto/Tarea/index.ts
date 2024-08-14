export * from './dto/TareaDTO'

import { Estado } from "@/types/estado";
import { Participante } from "../Participante";
import { Usuario } from '@/types/usuario';

export type Tarea = {
    idTarea?: number | string;
    titulo : string;
    descripcion? : string;
    fechaInicio : string;
    fechaFin : string;
    createdAt?: string;
    updatedAt?: string;
    tareaAnterior? : Tarea
    estado : Estado
    participantesAsignados : Participante[] // Consultores
    subTareas: SubTarea[]
    feedbacks? : FeedbackTarea[]
}

export type SubTarea = {
    idSubTarea: number | string
    descripcion: string
    completado: boolean
}

export type FeedbackTarea = {
    id : number
    mensaje: string
    leido : boolean
    usuario : Usuario
    createdAt: string
    updatedAt: string
}