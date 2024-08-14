"use server";

import { fetcher } from "@/server/fetch/server-side";
import { Proyecto } from "@/types/proyecto";
import { revalidateTag } from "next/cache";

export async function getEstadoFeedback(
  id: string | number
): Promise<boolean | null> {
  try {
    const response = await fetcher("/feedbackcli/get/" + id, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data.registrado; // Asumiendo que el campo booleano es 'registrado'
    } else {
      console.error("Error: ", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Fetch error: ", error);
    return null;
  }
}


  export async function enviarEncuesta(
    id: string | number,
    calificaciones: number[], // Array de calificaciones
    comentario: string, // Comentarios adicionales
  ): Promise<{ status: string; message: string }> {
    try {
      const data = {
        calificaciones,  // Array de calificaciones
        comentario,     // Comentarios adicionales
      };
      const response = await fetcher("/feedbackcli/update/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log('Response Status:' + response.status)
  
      const res = returnResponse(
        response,
        "encuestas",
        "La encuesta ha sido enviada exitosamente",
        "Error al enviar la encuesta",
      );
      //console.log(res)
      return res;
    } catch (error) {
      console.error(error);
      return {
        status: "error",
        message: "Error al enviar la encuesta",
      };
    }
  }

  function returnResponse(
    response: Response,
    tag: string,
    successMessage: string,
    errorMessage: string,
  ) {
    console.log("response", response);
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
  