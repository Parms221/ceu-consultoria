"use server";

import { fetcher } from "@/server/fetch/server-side";
import { revalidateTag } from "next/cache";

export async function deleteRecursoServer(
  id: number,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher(`/recursos/${id}`, {
      method: "DELETE",
    });
    return returnResponse(
      response,
      "recursos",
      "Recurso eliminado exitosamente",
      "Error al eliminar recurso",
    );
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Error al eliminar recurso",
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
  console.error(response);
  return {
    status: "error",
    message: errorMessage,
  };
}