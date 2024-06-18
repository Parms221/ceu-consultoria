interface Representante {
  id_representante: number;
  nombre: string;
  apellido: string;
  dni: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClienteJuridico extends Cliente {
  razonSocial: string;
  ruc: string;
  direccion: string;
  representante: Representante;
}

export interface ClienteNatural extends Cliente {
  nombre: string;
  apellido: string;
  dni: string;
}


export interface Cliente {
  id_cliente: number;
  createdAt: string;
  updatedAt: string;
  tipoCliente: "NATURAL" | "JURIDICO";
}
