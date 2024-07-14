type ClienteJsonResponse = {
  idCliente: number;
  tipo_documento: string;
  telefono: string;
  email: string;
  usuarioCliente: null;
  createdAt: string;
  updatedAt: string;
  nombre: string;
  apellido: string;
  dni: string;
};

export type ProyectoIncompletoJsonResponse = {
  idProyecto: number;
  titulo: string;
  descripcion: string;
  objetivos: string;
  requerimientos: string;
  indicaciones: string;
  fechaInicio: string;
  fechaLimite: string;
  precio: number;
  cliente: {
    idCliente: number;
    tipo_documento: string;
    telefono: string;
    email: string;
    usuarioCliente: any;
    createdAt: string;
    updatedAt: string;
    nombre: string;
    apellido: string;
    dni: string;
  };
  servicio: {
    idServicio: number;
    titulo: string;
    precio: number;
    descripcion: string;
    entregablesDelServicio: Array<{
      idEntregableServicio: number;
      titulo: string;
    }>;
  };
  estado: {
    idEstado: number;
    descripcion: string;
    tipo: number;
  };
  createdAt: string;
  updatedAt: string;
  participantes: string[];
  reuniones: string[];
  hitos: string[];
  entregables: string[];
};
