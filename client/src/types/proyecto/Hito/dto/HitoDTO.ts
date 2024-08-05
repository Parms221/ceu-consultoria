import { TareaDTO } from "../../Tarea";

export type HitoDTO = {
    idHito?: string;
    titulo: string
    fechaInicio : Date
    fechaFinalizacion : Date
    tareas: TareaDTO[]
}