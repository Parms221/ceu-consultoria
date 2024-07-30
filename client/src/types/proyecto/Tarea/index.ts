export * from './dto/TareaDTO'

import { Estado } from "@/types/estado";
import { Participante } from "../Participante";
import { Consultor } from '@/types/consultor';

export type Tarea = {
    idTarea?: number;
    titulo : string;
    descripcion : string;
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
    idSubTarea: number
    descripcion: string
    completado: boolean
}

export type FeedbackTarea = {
    id : number
    mensaje: string
    consultor : Consultor
    createdAt: string
    updatedAt: string
}