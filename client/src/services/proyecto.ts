"use client";
import { UseFormReturn } from "react-hook-form";
import { ProyectoIncompletoDto, ProyectoIncompletoJsonResponse } from "@/actions/Proyecto";
import { fetcherLocal } from "@/server/fetch/client-side";
import HandleServerResponse from "@/lib/handle-response";
import { toast } from "sonner";

export async function createProyectoIncompleto(
  data: ProyectoIncompletoDto, form?: UseFormReturn<any, any, undefined>, toastId?: string | number
) {
  try {
    const response = await fetcherLocal("/proyectos/addProyecto", {
      method: "POST",
      body: JSON.stringify(data)
    });

    const ok = await HandleServerResponse(response, form, toastId);

    if (ok) {
      const json: ProyectoIncompletoJsonResponse = await response.json();
      toast.success("Proyecto creado correctamente", { id: toastId, position: "top-center" });
      return json;
    }
    return null;

  } catch (err) {
    toast.error("Ha ocurrido un error inesperado", { id: toastId, position: "top-center" });
    return null;
  }
}