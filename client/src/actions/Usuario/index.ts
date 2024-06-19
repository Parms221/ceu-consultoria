"use server"

import { Usuario } from "@/types/usuario";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createUsuario(data: any): Promise<{status: string, message: string}>{
    try {
        const response = await fetch("http://localhost:8800/usuarios/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwibm9tYnJlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUub3JnIiwiaWF0IjoxNzE4NzQ5MTQ2LCJleHAiOjE3NTAyODUxNDYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9.fjJS1_uNgH-t0l9cdP5l03bW_4Q750_7eqTnSSU8Xvl-7vtSb49WZfnJsoaJd-mz"
          },
          body: JSON.stringify(data)
        }, 
      )
      if(response.ok){
        revalidateTag("usuarios")
        return {
            status: "success",
            message: "Usuario creado exitosamente"
        }
      }
          return {
                status: "error",
                message: "Error al crear usuario"
        }
      }catch(e){
        console.log(e)
        return {
            status: "error",
            message: "Error al crear usuario"
        }
      }
}