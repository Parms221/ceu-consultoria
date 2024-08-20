export type TareaDTO = {
  idTarea?: string;
  titulo: string;
  descripcion?: string;
  fechaInicio: Date;
  fechaFin: Date;
  createdAt?: string;
  updatedAt?: string;
  tareaAnterior?: TareaDTO;
  estado: number;
  participantesAsignados?: string[]; // Consultores
  subtareas?: SubTareaDTO[];
};

export type SubTareaDTO = {
  descripcion: string;
  completado: boolean;
};
