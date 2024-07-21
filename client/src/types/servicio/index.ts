export type Entregable = {
  titulo: string;
};

export type Servicio = {
  idServicio: number;
  titulo: string;
  descripcion: string;
  entregablesDelServicio: Entregable[];
  precio: number
};
