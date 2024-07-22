"use client";
import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Proyecto } from "@/types/proyecto";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useProyecto() {

  function getProyectosPropuestosQuery(){
    return useQuery<Proyecto[]>({
      queryKey: ["proyectos","propuestos"],
      queryFn: async () => {
        const response = await fetcherLocal(`/proyectos/propuestos`);

        if (!response.ok) {
          throw new Error("Error fetching projects");
        }

        const data = await response.json();

        return data as Proyecto[];
      },
    });
  }

  function getProyectoByIdQuery(id: number) {
    return useQuery<Proyecto>({
      queryKey: ["proyecto", id],
      queryFn: async () => {
        const response = await fetcherLocal(`/proyectos/getProyecto/${id}`);

        if (!response.ok) {
          throw new Error("Error fetching project");
        }

        const data = await response.json();

        return data as Proyecto;
      },
    });
  }

  async function actualizarEstadoProyecto(id: number, estado: number) {
    const toastId = toast.loading(`Actualizando estado de proyecto ...`);
    try {
      const response = await fetcherLocal(`/proyectos/propuestos/${id}`, {
        method: "POST",
        body: JSON.stringify({
          idEstado: estado,
        }),
      });
      const ok = await HandleServerResponse(response, undefined);
      if (!ok) {
        throw new Error(`Ocurrió un error, inténtelo nuevamente`);
      }
      toast.success("Estado de proyecto actualizado", {
        id: toastId,
      });
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error, inténtelo nuevamente", {
        id: toastId,
      });
    }
  }

  return {
    getProyectoByIdQuery,
    getProyectosPropuestosQuery,
    actualizarEstadoProyecto
  };
}
