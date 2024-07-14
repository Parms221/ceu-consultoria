export * from './dto/TareaDTO'

import { Estado } from "@/types/estado";
import { Participante } from "../Participante";

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
}

export type SubTarea = {
    idSubTarea: number
    descripcion: string
    completado: boolean
}