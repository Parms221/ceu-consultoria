import { TareaDTO } from "../../Tarea";

export type HitoDTO = {
    idHito?: number | string;
    titulo: string
    fechaInicio : Date
    fechaFinalizacion : Date
    tareas: TareaDTO[]
}