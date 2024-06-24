"use server";
import { fetcher } from "@/server/fetch/server-side";
import { Cliente } from "@/types/cliente";
import {
  CreateClienteJuridicoDto,
  CreateClienteNaturalDto,
  UpdateClienteJuridicoDto,
  UpdateClienteNaturalDto,
} from "@/types/cliente/ClienteDto";
import { revalidateTag } from "next/cache";

export async function getClientes(): Promise<Cliente[]> {
  try {
    const response = await fetcher("/clientes", {
      method: "GET",
    });
    let data;
    if (response.ok) {
      data = await response.json();
      console.log(data);
      return data as Cliente[];
    } else {
      console.error("Error: ", response);
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createClienteJuridico(
  data: CreateClienteJuridicoDto,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher("/clientes/juridicos/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return returnResponse(
      response,
      "clientes",
      "Cliente creado exitosamente",
      "Error al crear cliente jurídico",
    );
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al crear cliente",
    };
  }
}

export async function udpateClienteJuridico(
  data: UpdateClienteJuridicoDto,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher(
      "/clientes/juridicos/update/" + data.idCliente,
      {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          idCliente: undefined,
        }),
      },
    );
    return returnResponse(
      response,
      "clientes",
      "Cliente actualizado exitosamente",
      "Error al actualizar el cliente",
    );
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al actualizar cliente",
    };
  }
}
export async function udpateClienteNatural(
  data: UpdateClienteNaturalDto,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher(
      "/clientes/naturales/update/" + data.idCliente,
      {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          idCliente: undefined,
        }),
      },
    );
    return returnResponse(
      response,
      "clientes",
      "Cliente actualizado exitosamente",
      "Error al actualizar el cliente",
    );
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al actualizar cliente",
    };
  }
}

export async function createClienteNatural(
  data: CreateClienteNaturalDto,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher("/clientes/naturales/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return returnResponse(
      response,
      "clientes",
      "Cliente creado exitosamente",
      "Error al crear cliente",
    );
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al crear cliente",
    };
  }
}
export async function deleteCliente(
  id: number,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher(`/clientes/delete/${id}`, {
      method: "DELETE",
    });
    return returnResponse(
      response,
      "clientes",
      "Cliente eliminado exitosamente",
      "Error al eliminar cliente",
    );
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Error al eliminar cliente",
    };
  }
}

function returnResponse(
  response: Response,
  tag: string,
  successMessage: string,
  errorMessage: string,
) {
  if (response.ok) {
    revalidateTag(tag);
    return {
      status: "success",
      message: successMessage,
    };
  }
  return {
    status: "error",
    message: errorMessage,
  };
}
