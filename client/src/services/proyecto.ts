"use client";
import { UseFormReturn } from "react-hook-form";
import { ProyectoIncompletoDto } from "@/actions/Proyecto";
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
      toast.success("Cliente creado correctamente", { id: toastId, position: "top-center" });
    }
    return ok;

  } catch (err) {
    toast.error("Ha ocurrido un error inesperado", { id: toastId, position: "top-center" });
    return false;
  }
}