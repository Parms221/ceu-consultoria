import { Entregable } from "../../servicio";

export type EntregableProyecto = {
    idEntregableProyecto: number;
    entregableServicio: Entregable
    fechaEntregada?: string;
    createdAt?: string;
}