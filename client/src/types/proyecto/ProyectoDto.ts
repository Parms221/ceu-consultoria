import { HitoDTO } from "./Hito/dto/HitoDTO";

export type ProyectoIncompletoDto = {
  titulo: string;
  descripcion?: string;
  objetivos: string;
  fechaInicio: Date;
  fechaLimite: Date;
  requerimientos: string;
  indicaciones: string;
  precio: number;
  idCliente: number;
  servicio: number;
  hitos : HitoDTO[];
};