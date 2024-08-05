import { FeedbackTarea, Tarea } from "../Tarea";

export type Hito = {
    idHito: number | string;
    titulo: string
    fechaInicio : string
    fechaFinalizacion : string
    createdAt?: string;
    tareasDelHito: Tarea[]
    feedbacks? : FeedbackTarea[]
}