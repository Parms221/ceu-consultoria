export type CreateServicioDto = {
  descripcion: string;
  precio: number;
  entregablesServicio: {
    titulo: string;
  }[];
};

export type UpdateServicioDto = {
  idServicio: number;
  descripcion: string;
  precio: number;
  entregablesServicio: {
    titulo: string;
  }[];
};
