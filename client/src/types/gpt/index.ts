import { Hito } from "../proyecto/Hito";

export type GptRequest = {
    tituloProyecto : string;
    fechaInicio : string;
    fechaFin : string;
}

export type GptCronogramaResponse = {
    fechaInicio : string;
    fechaLimite : string;
    hitos : Hito[];
}