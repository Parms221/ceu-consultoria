export type Entregable = {
  titulo: string;
};

export type Servicio = {
  idServicio: number;
  precio: number;
  titulo: string;
  descripcion: string;
  entregablesDelServicio: Entregable[];
};
