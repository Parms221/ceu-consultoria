"use client";
import { UseFormReturn } from "react-hook-form";
import { fetcherLocal } from "@/server/fetch/client-side";
import HandleServerResponse from "@/lib/handle-response";
import { toast } from "sonner";
import { ProyectoIncompletoJsonResponse } from "@/types/proyecto/Response";
import { ProyectoIncompletoDto } from "@/types/proyecto/ProyectoDto";

export async function createProyectoIncompleto(
  data: ProyectoIncompletoDto,
  form?: UseFormReturn<any, any, undefined>,
  toastId?: string | number,
) {
  try {
    const response = await fetcherLocal("/proyectos/addProyecto", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const ok = await HandleServerResponse(response, form, toastId);

    if (ok) {
      const json: ProyectoIncompletoJsonResponse = await response.json();
      toast.success("Proyecto creado correctamente", {
        id: toastId,
        position: "top-center",
      });
      return json;
    }
    return null;
  } catch (err) {
    toast.error("Ha ocurrido un error inesperado", {
      id: toastId,
      position: "top-center",
    });
    return null;
  }
}
