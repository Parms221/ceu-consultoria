"use client";
import { Badge } from "@/components/ui/badge";
import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Estado } from "@/types/estado";
import { Proyecto } from "@/types/proyecto";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useProyecto() {
  const queryClient = useQueryClient();

  function getProyectosPropuestosQuery() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Proyecto[]>({
      queryKey: ["proyectos", "propuestos"],
      queryFn: async () => {
        const response = await fetcherLocal(`/proyectos/propuestos`);

        if (!response.ok) {
          throw new Error("Error fetching projects");
        }

        const data = await response.json();

        return data as Proyecto[];
      }
    });
  }

  function getProyectoByIdQuery(id: number) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Proyecto>({
      queryKey: ["proyecto", id],
      queryFn: async () => {
        const response = await fetcherLocal(`/proyectos/getProyecto/${id}`);

        if (!response.ok) {
          throw new Error("Error fetching project");
        }

        const data = await response.json();

        return data as Proyecto;
      }
    });
  }

  async function actualizarEstadoProyecto(id: number, estado: number) {
    const toastId = toast.loading(`Actualizando estado de proyecto ...`);
    try {
      const response = await fetcherLocal(`/proyectos/propuestos/${id}`, {
        method: "POST",
        body: JSON.stringify({
          idEstado: estado
        })
      });
      const ok = await HandleServerResponse(response, undefined);
      if (!ok) {
        throw new Error(`Ocurrió un error, inténtelo nuevamente`);
      }
      toast.success("Estado de proyecto actualizado", {
        id: toastId
      });
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error, inténtelo nuevamente", {
        id: toastId
      });
    }
  }

  async function deleteProyecto(id: number) {
    const toastId = toast.loading(`Eliminando proyecto ...`);
    try {
      const response = await fetcherLocal(`/proyectos/deleteProyecto/${id}`, {
        method: "DELETE"
      });
      const ok = await HandleServerResponse(response, undefined, toastId);
      if (!ok) {
        throw new Error(`Ocurrió un error, inténtelo nuevamente`);
      }
      toast.success("Proyecto eliminado", {
        id: toastId
      });
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error, inténtelo nuevamente", {
        id: toastId
      });
    }
    queryClient.invalidateQueries({ queryKey: ["proyectos"] });
  }


  // Otras funciones
  function getBadgeByStatus(status : Estado){
    // 1	"Propuesto"
    // 2	"En desarrollo"
    // 3	"Finalizado"
    // 4	"Cancelado"
    // 5	"Rechazado"

    return (
      <Badge
        className="flex justify-center"
        variant={
          status.idEstado === 1
            ? "outline"
            : status.idEstado === 2
            ? "default"
            : status.idEstado === 3
            ? "success"
            : status.idEstado === 4
            ? "ghost"
            : status.idEstado === 5
            ? "destructive"
            : "secondary"
        }
      >
        {
          status.descripcion
        }
      </Badge>
    )
  }

  return {
    getProyectoByIdQuery,
    getProyectosPropuestosQuery,
    actualizarEstadoProyecto,
    deleteProyecto,

    getBadgeByStatus
  };
}
