"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Diamond, Circle } from "lucide-react";
import { Hito } from "@/types/proyecto/Hito";
import { es } from "date-fns/locale/es";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { cn } from "@/lib/utils";
import { Tarea } from "@/types/proyecto/Tarea";
import { DeleteTask, FeedbackChat } from "../dialogs";
import NewTaskModal from "../../../forms/Tareas";
import NewHitoModal from "../../../forms/Hitos";
import useTarea from "@/hooks/Tarea/useTarea";
import useHito from "@/hooks/Hito/useHito";
import { convertFromHitoToDTO, convertFromTareaToDTO } from "../../../forms/utils";



export function isExpandedChevron(isExpanded: boolean) {
  return (
    <ChevronRight
      className={cn(
        "h-5 w-5 transition-all duration-200 ease-in-out",
        isExpanded ? "rotate-90 transform" : ""
      )}
    />
  );
}

export const hitosColumns: ColumnDef<Partial<Hito> & Partial<Tarea>>[] = [
  {
    id: "titulo",
    accessorKey: "titulo",
    header: ({ table }) => (
      <div className="flex items-center">
        <Button
          className="h-fit p-0"
          variant={"link"}
          onClick={() => table.toggleAllRowsExpanded()}
        >
          {isExpandedChevron(table.getIsAllRowsExpanded())}
          <span className="sr-only">Expandir todos</span>
        </Button>{" "}
        Tareas
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div
          style={{
            paddingLeft: `${row.depth * 2}rem`
          }}
        >
          <div className="flex items-center">
            {row.getCanExpand() ? (
              <Button
                variant={"ghost"}
                className="p-0"
                onClick={() => row.toggleExpanded()}
              >
                {isExpandedChevron(row.getIsExpanded())}
              </Button>
            ) : (
              <div className="h-5 w-[20px]" />
            )}{" "}
            <span className="ml-2 inline-flex items-center gap-3">
              {row.original.idTarea ? (
                <Circle className="h-3 w-3 text-ceu-celeste shrink-0" />
              ) : (
                <Diamond className="h-3 w-3 text-ceu-celeste shrink-0" />
              )}

              {row.original.titulo}
            </span>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "fechaInicio",
    header: "Fecha de inicio",
    cell: ({ row }) => {
      const fechaInicio = row.original.fechaInicio;
      if (!fechaInicio) return "-";
      const date = new Date(fechaInicio);
      return format(date, "d/MM/yyyy hh:mm a");
    }
  },
  {
    accessorKey: "fechaFinalizacion",
    header: "Fecha de finalización",
    cell: ({ row }) => {
      const dateFin = row.original.fechaFinalizacion || row.original.fechaFin;
      if (!dateFin) return "-";
      return format(dateFin, "d/MM/yyyy hh:mm a");
    }
  },
  {
    id: "duracion",
    header: "Duración",
    enableColumnFilter: true,
    cell: ({ row }) => {
      const inicio = row.original.fechaInicio;
      const final = row.original.fechaFinalizacion || row.original.fechaFin;
      if (!inicio || !final) return "-";

      // get diff time in days using date-fns
      const duracion = intervalToDuration({
        start: new Date(inicio),
        end: new Date(final)
      });
      return <span>{formatDuration(duracion, { locale : es})}</span>;
    }
  },
  {
    id: "estado",
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { getBadgeByStatus } = useTarea()
      const estado = row.original.estado;
      if (!estado) return "";
      return getBadgeByStatus(estado);
    }
  },
  {
    id: "retroalimentacion",
    header: "Retroalimentación",
    cell: ({ row } ) => {
       const task = row.original;
        return ( 
          <div className="flex justify-center">
            <FeedbackChat tarea={task as Tarea | Hito} />
          </div>
        )
    }
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const task = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {  } = useHito()
      return (
        <div className="flex gap-2">
          {/* Editar y eliminar */}
          {
            task.idTarea ?
              (<NewTaskModal asEdit task={convertFromTareaToDTO(task as Tarea)} />)
              :
              <NewHitoModal asEdit task={convertFromHitoToDTO(task as Hito)} />
              // <EditHitoModal hito={task as Hito} />
          }
          <DeleteTask tarea={task as Tarea | Hito} />


        </div>
      );
    }
  }
];
