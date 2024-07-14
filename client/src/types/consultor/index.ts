import { Usuario } from "../usuario";

export type Consultor = {
  idConsultor: number;
  nombres: string;
  apellidos: string;
  genero: "M" | "F";
  especialidades: string;
  usuarioConsultor: Usuario;
  createdAt: string;
  updatedAt: string;
};
