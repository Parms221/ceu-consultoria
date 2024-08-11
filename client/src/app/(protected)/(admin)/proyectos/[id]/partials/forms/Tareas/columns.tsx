"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2Icon, ChevronRight } from "lucide-react";
import { format, formatDuration, intervalToDuration, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { getBadgeByEstado } from "../../vistas/lista/DataTable/columns";
import { Tarea, TareaDTO } from "@/types/proyecto/Tarea";
import { useQuery } from "@tanstack/react-query";
import { Estado } from "@/types/estado";
import { fetcherLocal } from "@/server/fetch/client-side";
import { useAppContext } from "@/app/(protected)/app.context";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";
import NewTaskModal from ".";
import { es } from "date-fns/locale/es";


function isExpandedChevron(isExpanded: boolean) {
  return <ChevronRight className={cn(
    "w-5 h-5 transition-all duration-200 ease-in-out",
    isExpanded ? "transform rotate-90" : ""
  )}/>
}

export const tareasColumns: ColumnDef<Tarea>[] = [
  {
    id: "titulo",
    accessorKey: "titulo",
    header: ({ table }) => (
      <div className="flex items-center">
      <Button
      className="p-0 h-fit"
      variant={"link"}
      onClick={() => table.toggleAllRowsExpanded()}
      >
        {isExpandedChevron(table.getIsAllRowsExpanded())}
        <span className="sr-only">
          Expandir todos
        </span>
      </Button>{' '}
      Tareas
    </div>
    ),
    cell: ({ row }) => (
      <div
        style={{
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        <div className="flex items-center">
          {row.getCanExpand() ? (
            <Button
            variant={"ghost"}
            className="p-0 h-fit"
              onClick={() => row.toggleExpanded()}
            >
              {isExpandedChevron(row.getIsExpanded())}
            </Button>
          ) : (
            <div className="w-[20px] h-5"/>
          )}{' '}
          {row.original.titulo}
        </div>
      </div>
    )
  },
  {
    accessorKey: "fechaInicio",
    header:"Fecha de inicio",
    cell: ({ row }) => {
      const fechaInicio = row.original.fechaInicio
      if(!fechaInicio) return "-"
      const date = new Date(fechaInicio);
      return format(date, 'd/MM/yyyy');
    },
  },
  {
    accessorKey: "fechaFinalizacion",
    header: "Fecha de finalización",
    cell: ({ row }) => {
      const dateFin = row.original.fechaFin;
      if(!dateFin) return "-"
      return format(dateFin, 'd/MM/yyyy');
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const { estados } = useAppContext() 
      const estado = row.original.estado;
      if (!estado || !estados) return "-";
      if (estado instanceof Object){
        return getBadgeByEstado(estado)
      }else {
        const estadoObj = estados.find(e => e.idEstado === estado)
        if (!estadoObj) return "-"
        return getBadgeByEstado(estadoObj)
      }
    },
  },
  {
    id: "duracion",
    header: "Duración",
    cell: ({ row }) => {
      const inicio = row.original.fechaInicio;
      const final = row.original.fechaFin
      if (!inicio || !final) return "-";
    
      // get diff time in days using date-fns
      const duracion = intervalToDuration({start: new Date(inicio), end: new Date(final)})
      return formatDuration(duracion, { locale: es});
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const tarea = row.original;
      const { hitoForm } = useProjectDetail()
      const tareasInForm = hitoForm.getValues("tareas") as unknown as TareaDTO[] ?? []
      return (
        <div className="flex gap-2">
          <NewTaskModal asEdit task={tarea as Tarea} />

          <Button
            variant="ghost"
            className="p-0"
            type="button"
            onClick={() => {
              const newTareas = tareasInForm.filter((t, index) => index !== row.index)
              hitoForm.reset({...hitoForm.getValues(), tareas: newTareas})
            }}
          >
            <Trash2Icon size={20} />
          </Button>  
        </div>
      );
    },
  },
];
