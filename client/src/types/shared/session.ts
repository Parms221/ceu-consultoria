import { Rol } from "../rol";

export interface SessionToken {
    name: string;
    email: string;
    picture: string;
    sub: string;
    roles : Rol[]
    iat: number;
    exp: number;
    jti: string; 
    expiration: number;
}