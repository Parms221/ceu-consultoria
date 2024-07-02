export type CreateServicioDto = {
  descripcion: string;
  precio: number;
  entregablesDelServicio: {
    titulo: string;
  }[];
};

export type UpdateServicioDto = {
  idServicio: number;
  descripcion: string;
  precio: number;
  entregablesDelServicio: {
    titulo: string;
  }[];
};
