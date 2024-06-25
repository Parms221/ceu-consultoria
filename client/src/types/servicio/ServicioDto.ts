export type CreateServicioDto = {
  descripcion: string;
  precio: number;
  entregablesServicio: {
    descripcion: string;
    titulo: string;
  }[];
};

export type UpdateServicioDto = {
  idServicio: number;
  descripcion: string;
  precio: number;
  entregablesServicio: {
    descripcion: string;
    titulo: string;
  }[];
};
