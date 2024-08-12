"use server";

import { ESTADOS } from "@/constants/proyectos/estados";
import { fetcher } from "@/server/fetch/server-side";
import { Proyecto } from "@/types/proyecto";
import { revalidateTag } from "next/cache";

export async function getProyectos(): Promise<Proyecto[] | undefined> {
  try {
    const response = await fetcher("/proyectos", {
      method: "GET",
    });
    let data;
    if (response.ok) {
      data = await response.json();
      return data as Proyecto[];
    } else {
      console.error("Error: ", response);
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getProyectosPropuestos(): Promise<
  Proyecto[] | undefined
> {
  try {
    const response = await fetcher("/proyectos/propuestos", {
      method: "GET",
    });
    let data;
    if (response.ok) {
      data = await response.json();
      return data as Proyecto[];
    } else {
      console.error("Error: ", response);
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getProyectoById(
  id: string | number,
): Promise<Proyecto | undefined> {
  try {
    const response = await fetcher("/proyectos/getProyecto/" + id, {
      method: "GET",
    });
    let data;
    if (response.ok) {
      data = await response.json();
      return data as Proyecto;
    } else {
      console.error("Error: ", response);
    }
  } catch (error) {
    console.error(error);
  }
}
export async function rechazarProyecto(
  id: string | number,
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher("/proyectos/propuestos/" + id, {
      method: "POST",
      body: JSON.stringify({
        idEstado: ESTADOS.rechazado,
      }),
    });
    const res = returnResponse(
      response,
      "proyectos/propuestos",
      "El proyecto ha sido rechazado",
      "Error al rechazar el proyecto",
    );
    return res;
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Error al rechazar el proyecto",
    };
  }
}
export async function aprobarProyecto(
  id: string | number,
): Promise<{ status: string; message: string }> {
  try {
    const data = {
      idEstado: ESTADOS.desarrollo,
    };
    const response = await fetcher("/proyectos/propuestos/" + id, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = returnResponse(
      response,
      "proyectos/propuestos",
      "El proyecto ha sido aprobado",
      "Error al aprobar el proyecto",
    );
    return res;
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Error al rechazar el proyecto",
    };
  }
}
export async function guardarParticipantes(
  proyectoId: string | number,
  consultoresIds: (string | number)[],
): Promise<{ status: string; message: string }> {
  try {
    const response = await fetcher(
      "/proyectos/" + proyectoId + "/participantes/save",
      {
        method: "POST",
        body: JSON.stringify(consultoresIds),
      },
    );
    const res = returnResponse(
      response,
      "proyectos",
      "Los participantes han sido guardados",
      "Error al guardar los participantes",
    );
    return res;
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Error al guardar los participantes",
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
