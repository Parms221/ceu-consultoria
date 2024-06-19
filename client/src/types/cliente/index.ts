type Representante = {
  representante_id: number;
  nombre: string;
  apellido: string;
  dni: string;
  created_at?: string;
  updated_at?: string;
};

type ClienteNatural = {
  tipo: "NATURAL";
  cliente_id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  tipo_documento?: string;
};

type ClienteJuridico = {
  tipo: "JURIDICO";
  cliente_id: number;
  razonSocial: string;
  ruc: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  representante?: Representante; // Representante es opcional
  tipo_documento?: string;
};

export type Cliente = ClienteNatural | ClienteJuridico;
