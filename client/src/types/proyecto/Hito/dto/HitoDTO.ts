import { TareaDTO } from "../../Tarea";

export type HitoDTO = {
    titulo: string
    fechaInicio : Date
    fechaFinalizacion : Date
    tareas: TareaDTO[]
}