type Representante = {
  representante_id: number;
  nombre: string;
  apellido: string;
  dni: string;
  created_at?: string;
  updated_at?: string;
};

type ClienteNatural = {
  idCliente: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  tipo_documento: "DNI";
};

type ClienteJuridico = {
  idCliente: number;
  razonSocial: string;
  ruc: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  representante?: Representante; // Representante es opcional
  tipo_documento: "RUC";
};

export type Cliente = ClienteNatural | ClienteJuridico;

export function GetClienteName(client: Cliente) {
  if (client.tipo_documento == "DNI") {
    return `${client.nombre} ${client.apellido}`;
  } else {
    return client.razonSocial;
  }
}
