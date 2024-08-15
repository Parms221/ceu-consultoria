import { InvitadoDTO } from "./InvitadoDTO"

export type ReunionDTO = {
    titulo : string
    descripcion? : string
    fechaInicio : string
    fechaFin : string
    invitados : InvitadoDTO[]
    crearEvento : boolean
    enviarUpdates : boolean
    enlace? : string
}