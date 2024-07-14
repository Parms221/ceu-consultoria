import { Estado } from "@/types/estado";
import { Participante } from "@/types/proyecto/Participante"
import { Consultor } from "@/types/consultor";

export type TareaDTO = {
    titulo : string;
    descripcion : string;
    fechaInicio : Date;
    fechaFin : Date;
    createdAt?: string;
    updatedAt?: string;
    tareaAnterior? : TareaDTO
    estado : Estado
    participantesAsignados : ParticipanteDTO[] // Consultores
    subTareas: SubTareaDTO[]
}

export type SubTareaDTO = {
    descripcion: string
    completado: boolean
}

export type ParticipanteDTO = {
    // createdAt : string
    idConsultor : number
}