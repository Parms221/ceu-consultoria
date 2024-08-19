"use client";
import { useAppContext } from "@/app/(protected)/app.context";
import { Badge } from "@/components/ui/badge";
import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { Estado } from "@/types/estado";
import { EstadisticasProyecto, Proyecto } from "@/types/proyecto";
import { ProyectoResumen } from "@/types/proyecto/ProyectoResumen";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TAREA_ESTADOS, ESTADOS } from "@/constants/proyectos/estados";

export default function useProyecto() {
  const queryClient = useQueryClient();
  
  function getEstadisticasQuery(){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<EstadisticasProyecto>({
      queryKey: ["proyectos", "estadisticas"],
      queryFn: async () => {
        const response = await fetcherLocal(`/proyectos/estadisticas`);
        if (!response.ok) {
          throw new Error("Error fetching projects");
        }
        const data = await response.json();
        return data;
      },
    })
  }

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
  
  // Retorna proyecto completo (incluye hitos y lo demás)
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

  // Retorna solo el resumen del proyecto sin hitos ni otros detalles del hito
  function getResumenByIdQuery(id: number) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<ProyectoResumen>({
      queryKey: ["proyecto", id],
      queryFn: async () => {
        const response = await fetcherLocal(`/proyectos/${id}/resumen`);

        if (!response.ok) {
          throw new Error("Error fetching project");
        }

        const data = await response.json();

        return data;
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
    return (
      <Badge
        className="flex justify-center whitespace-nowrap"
        variant={
          status.idEstado === ESTADOS.propuesto
            ? "outline"
            : status.idEstado === ESTADOS.desarrollo
            ? "default"
            : status.idEstado === ESTADOS.finalizado
            ? "success"
            : status.idEstado === ESTADOS.cancelado
            ? "ghost"
            : status.idEstado === ESTADOS.rechazado
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

  function calculateProgress(proyecto : Proyecto){
    
    if(proyecto.hitos == null) return 0

    let total = 0
    let tareasCompletadas = 0
    for (let hito of proyecto.hitos){
      total += hito.tareasDelHito.length
      for (let tarea of hito.tareasDelHito){
        if(tarea.estado.idEstado === TAREA_ESTADOS.hecho){
          tareasCompletadas++
        }
      }
    }
    if(total === 0)
      return 0
    return (tareasCompletadas / total) * 100
  }

  return {
    getEstadisticasQuery,
    getProyectoByIdQuery,
    getProyectosPropuestosQuery,
    getResumenByIdQuery,
    
    actualizarEstadoProyecto,
    deleteProyecto,

    getBadgeByStatus,
    calculateProgress
  };
}
