"use server"

import { fetcher } from "@/server/fetch/server-side";
import { CreateUsuarioDto, UpdatePasswordDto, UpdateUsuarioDetailsDto, Usuario } from "@/types/usuario";
import { revalidateTag } from "next/cache";

export async function getUsuarios(): Promise<Usuario[] | undefined> {
  try {
    const response = await fetcher ("/usuarios", {
      method: "GET",
    }) 
    let data
    if (response.ok){
      data = await response.json()
      return data as Usuario[]
    }else {
      console.error("Error: ", response)
    }
  }catch(error) {
      console.error(error);
  }
}

export async function getUsuarioById(id: number): Promise<Usuario | undefined> {
  try {
    const response = await fetcher(`/usuarios/${id}`, {
      method: "GET",
    })
    let data
    if (response.ok){
      data = await response.json()
      return data as Usuario
    }else {
      console.error("Error: ", response)
    }
  }catch(error) {
    console.error(error);
  }
}

export async function createUsuario(data: CreateUsuarioDto): Promise<{status: string, message: string}>{
    try {
        const response = await fetcher("/usuarios/create", {
          method: "POST",
          body: JSON.stringify(data)
        },)
        return returnResponse(response,"usuarios","Usuario creado exitosamente", "Error al crear usuario")
      
      }catch(e){
        console.log(e)
        return {
            status: "error",
            message: "Error al crear usuario"
        }
      }
}

export async function updateUsuarioDetails(id: number, data : UpdateUsuarioDetailsDto){
    try {
      const response = await fetcher(`/usuarios/update/${id}`, {
          method: "PUT",
          body: JSON.stringify(data)
        }
      )

      return returnResponse(
          response, `usuarios/${id}`,
          "Usuario actualizado exitosamente", 
          "Error al actualizar el usuario"
        )
    } catch (e) {
      console.log(e)
      return {
          status: "error",
          message: "Error al actualizar usuario"
      }
    }
}

export async function updateUsuarioPassowrd(id: number, data: UpdatePasswordDto){
  try {
    const response = await fetcher(`/usuarios/update/${id}/password`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
    return returnResponse(response, `usuarios/${id}`,
      "Contraseña actualizada exitosamente", 
      "Error al actualizar la contraseña, verifique que ingresó la contraseña actual correcta"
    )
  } catch (error) {
    console.error(error)
    return {
        status: "error",
        message: "Error al actualizar contraseña"
    }
  }
}

export async function deleteUsuario(id: number): Promise<{status: string, message: string}>{
  try {
      const response = await fetcher(`/usuarios/delete/${id}`, {
        method: "DELETE"
      })
      return returnResponse(response, "usuarios", "Usuario eliminado exitosamente", "Error al eliminar usuario")
  } catch (error) {
    console.error(error)
    return {
        status: "error",
        message: "Error al eliminar usuario"
    }
  }
}

function returnResponse(response : Response, tag : string, successMessage: string, errorMessage: string){
  if(response.ok){
    revalidateTag(tag)
    return {
        status: "success",
        message: successMessage
    }
  }
      return {
            status: "error",
            message: errorMessage
    }
}