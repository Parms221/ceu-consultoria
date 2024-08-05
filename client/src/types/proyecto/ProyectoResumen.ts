import { Cliente } from "../cliente";
import { Estado } from "../estado";
import { Servicio } from "../servicio";
import { Participante } from "./Participante";

export type ProyectoResumen = {
    idProyecto: number;
    titulo : string;
    descripcion: string;
    objetivos: string;
    requerimientos: string;
    fechaInicio: string;
    fechaLimite: string;
    precio: number;
    cliente: Cliente;
    servicio : Servicio
    estado: Estado;
    createdAt?: string;
    updatedAt?: string;
    participantes?: Participante[];
    // reuniones?: Reunion[];
    // hitos?: Hito[];
    // entregables?: EntregableProyecto[]
    progreso: Number;
}
