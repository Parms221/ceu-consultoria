export type CreateServicioDto = {
  descripcion: string;
  entregablesDelServicio: {
    titulo: string;
  }[];
};

export type UpdateServicioDto = {
  idServicio: number;
  descripcion: string;
  entregablesDelServicio: {
    titulo: string;
  }[];
};
