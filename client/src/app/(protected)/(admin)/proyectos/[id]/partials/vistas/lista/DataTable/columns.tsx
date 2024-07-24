"use client";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2Icon, ChevronRight, Diamond, Circle, Pen } from "lucide-react";
import { Hito } from "@/types/proyecto/Hito";
import { es } from "date-fns/locale/es";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { cn } from "@/lib/utils";
import { Tarea } from "@/types/proyecto/Tarea";
import { DeleteTask, FeedbackChat } from "../dialogs";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import NewTaskModal from "../../../forms/Tareas";
import NewHitoModal from "../../../forms/Hitos";

function isExpandedChevron(isExpanded: boolean) {
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
            <span className="ml-5 inline-flex items-center gap-3">
              {row.original.idTarea ? (
                <Circle className="h-4 w-4 text-ceu-celeste" />
              ) : (
                <Diamond className="h-4 w-4 text-ceu-celeste" />
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
      return format(date, "d/MM/yyyy");
    }
  },
  {
    accessorKey: "fechaFinalizacion",
    header: "Fecha de finalización",
    cell: ({ row }) => {
      const dateFin = row.original.fechaFinalizacion || row.original.fechaFin;
      if (!dateFin) return "-";
      return format(dateFin, "d/MM/yyyy");
    }
  },
  {
    id: "duracion",
    header: "Duración (días)",
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
      return Number(duracion.days ?? 0);
    }
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const task = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { setSelectedHito, setSelectedTask } = useProjectDetail();
      return (
        <div className="flex gap-2">
          <FeedbackChat tarea={task as Tarea | Hito} />
          {/* Editar y eliminar */}
          {
            task.idTarea ?
              (<NewTaskModal asEdit task={task as Tarea} />)
              :
              <NewHitoModal asEdit task={task as Hito} />
          }
          <DeleteTask tarea={task as Tarea | Hito} />


        </div>
      );
    }
  }
];
