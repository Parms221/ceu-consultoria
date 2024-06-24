export type CreateClienteJuridicoDto = {
  tipo_documento: string;
  ruc: string;
  razonSocial: string;
  direccion: string;
  email: string;
  telefono: string;
};

export type UpdateClienteJuridicoDto = {
  idCliente: number;
  tipo_documento: string;
  ruc: string;
  razonSocial: string;
  direccion: string;
  email: string;
  telefono: string;
};
export type CreateClienteNaturalDto = {
  tipo_documento: string;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
};

export type UpdateClienteNaturalDto = {
  idCliente: number;
  tipo_documento: string;
  dni: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
};
