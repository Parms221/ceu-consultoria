import { Usuario } from "../usuario";

export type Consultor = {
    idConsultor: number;
    nombres: string
    apellidos : string
    genero : string
    cargo : string
    usuarioConsultor? : Usuario
    createdAt?: string;
    updatedAt?: string;
}