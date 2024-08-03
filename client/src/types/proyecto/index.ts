export * from "./"
import { Cliente } from "../cliente";
import { Estado } from "../estado";
import { Servicio } from "../servicio";
import { EntregableProyecto } from "./EntregableProyecto";
import { Hito } from "./Hito";
import { Participante } from "./Participante";
import { Reunion } from "./Reunion";

export type Proyecto = {
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
    reuniones?: Reunion[];
    hitos?: Hito[];
    entregables?: EntregableProyecto[]
}

export type EstadisticasProyecto = {
    terminados : number;
    propuestos : number;
    consultores : {
        current : number;
        max : number;
    }
}