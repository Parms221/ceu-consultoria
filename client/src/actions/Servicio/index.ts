"use server";
import { fetcher } from "@/server/fetch/server-side";
import { Servicio } from "@/types/servicio";
import {
  CreateServicioDto,
  UpdateServicioDto,
} from "@/types/servicio/ServicioDto";
import { revalidateTag } from "next/cache";

export async function getServicios(): Promise<Servicio[]> {
  try {
    const response = await fetcher("/servicios", {
      method: "GET",
    });
    let data;
    if (response.ok) {
      data = await response.json();
      console.log(data);
      return data as Servicio[];
    } else {
      console.error("Error: ", response);
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createServicio(
  data: CreateServicioDto,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher("/servicios/juridicos/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return returnResponse(
      response,
      "servicios",
      "Servicio creado exitosamente",
      "Error al crear servicio jurídico",
    );
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al crear servicio",
    };
  }
}

export async function udpateServicio(
  data: UpdateServicioDto,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher(
      "/servicios/juridicos/update/" + data.idServicio,
      {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          idServicio: undefined,
        }),
      },
    );
    return returnResponse(
      response,
      "servicios",
      "Servicio actualizado exitosamente",
      "Error al actualizar el servicio",
    );
  } catch (e) {
    console.log(e);
    return {
      status: "error",
      message: "Error al actualizar servicio",
    };
  }
}
export async function deleteServicio(
  id: number,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher(`/servicios/delete/${id}`, {
      method: "DELETE",
    });
    return returnResponse(
      response,
      "servicios",
      "Servicio eliminado exitosamente",
      "Error al eliminar servicio",
    );
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Error al eliminar servicio",
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
