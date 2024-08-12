import { Usuario } from "@/types/usuario";

export * from "./dto/ReunionDTO";
export * from "./dto/InvitadoDTO";

export type Reunion = {
    idReunion : number
    titulo : string
    descripcion? : string
    enlace : string

    eventId? : string
    eventOrganizer? : string
    eventHtmlLink? : string

    fechaInicio : string
    fechaFin : string
    createdAt : string
    updatedAt : string

    invitados : InvitadoReunion[]

    usuario: Usuario
}

export type InvitadoReunion = {
    idInvitado: number
    email: string
    opcional: boolean
    createdAt: string
}