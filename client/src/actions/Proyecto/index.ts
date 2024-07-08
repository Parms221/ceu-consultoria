"use server";

import { fetcher } from "@/server/fetch/server-side"
import { CreateClienteJuridicoDto, CreateClienteNaturalDto, UpdateClienteJuridicoDto } from "@/types/cliente/ClienteDto"
import { Proyecto } from "@/types/proyecto"

type ClienteJsonResponse = {
  idCliente: number,
  tipo_documento: string,
  telefono: string,
  email: string,
  usuarioCliente: null,
  createdAt: string,
  updatedAt: string,
  nombre: string,
  apellido: string,
  dni: string,
}

export async function getProyectos(): Promise<Proyecto[] | undefined> {
    try {
      const response = await fetcher ("/proyectos", {
        method: "GET",
      }) 
      let data
      if (response.ok){
        data = await response.json()
        return data as Proyecto[]
      }else {
        console.error("Error: ", response)
      }
    }catch(error) {
        console.error(error);
    }
  }

export async function createClienteJuridico(
  data: CreateClienteJuridicoDto,
): Promise<{ status: string; message: string, idCliente: number, cliente: any }> {
  try {
    const response = await fetcher("/clientes/juridicos/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    let cliente = await response.json();
    if (response.ok) {
      return {
        status: "success",
        message: "Cliente creado exitosamente",
        idCliente: cliente.idCliente,
        cliente: cliente,
      };
    }

    return {
        status: "error",
        message: "Error al crear cliente",
        idCliente: 0,
        cliente: 0
      };
    
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al crear cliente",
      idCliente: 0,
      cliente: 0
    };
  }
}

export async function createClienteNatural(
  data: CreateClienteNaturalDto,
): Promise<{ status: string; message: string, idCliente: number, cliente?: ClienteJsonResponse}> {
  try {
    const response = await fetcher("/clientes/naturales/create", {
      method: "POST",
      body: JSON.stringify(data),
    });

    let cliente = await response.json();
    console.log("Cliente json");
    console.log(cliente);

    if (response.ok) {
      return {
        status: "success",
        message: "Cliente creado exitosamente",
        idCliente: cliente.idCliente,
        cliente: cliente,
      };
    } 

    return {
      status: "error",
      message: "Error al crear cliente",
      idCliente: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al crear cliente",
      idCliente: 0,
    };
  }
}

// export async function udpateClienteJuridico(
//   data: UpdateClienteJuridicoDto,
// ): Promise<{ status: string; message: string,  }> {
//   try {
//     const response = await fetcher(
//       "/clientes/juridicos/update/" + data.idCliente,
//       {
//         method: "PUT",
//         body: JSON.stringify({
//           ...data,
//           idCliente: undefined,
//         }),
//       },
//     );
//     return returnResponse(
//       response,
//       "clientes",
//       "Cliente actualizado exitosamente",
//       "Error al actualizar el cliente",
//     );
//   } catch (e) {
//     console.log(e);
//     return {
//       status: "error",
//       message: "Error al actualizar cliente",
//     };
//   }
// }
// export async function udpateClienteNatural(
//   data: UpdateClienteNaturalDto,
// ): Promise<{ status: string; message: string }> {
//   try {
//     const response = await fetcher(
//       "/clientes/naturales/update/" + data.idCliente,
//       {
//         method: "PUT",
//         body: JSON.stringify({
//           ...data,
//           idCliente: undefined,
//         }),
//       },
//     );
//     return returnResponse(
//       response,
//       "clientes",
//       "Cliente actualizado exitosamente",
//       "Error al actualizar el cliente",
//     );
//   } catch (e) {
//     console.log(e);
//     return {
//       status: "error",
//       message: "Error al actualizar cliente",
//     };
//   }
// }