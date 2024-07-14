"use client";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2Icon, ChevronRight } from "lucide-react";
import Link from "next/link";
// import DeleteUserDialog from "../Dialogs/DeleteUserDialog";
import { Hito } from "@/types/proyecto/Hito";
import { es } from "date-fns/locale/es";
import { format, formatDuration, intervalToDuration, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Tarea } from "@/types/proyecto/Tarea";
import FeedbackChat from "../../../forms/modal/feedback-de-tarea";


function isExpandedChevron(isExpanded: boolean) {
  return <ChevronRight className={cn(
    "w-5 h-5 transition-all duration-200 ease-in-out",
    isExpanded ? "transform rotate-90" : ""
  )}/>
}

export const hitosColumns: ColumnDef<Partial<Hito> & Partial<Tarea>>[] = [
  {
    id: "titulo",
    accessorKey: "titulo",
    header: ({ table }) => (
      <div className="flex items-center">
      <Button
      className="p-0"
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
            className="p-0"
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de inicio" />
    ),
    cell: ({ row }) => {
      const fechaInicio = row.original.fechaInicio
      if(!fechaInicio) return "-"
      const date = new Date(fechaInicio);
      return <div>{
        format(date, 'd/MM/yyyy')
        }</div>;
    },
  },
  {
    accessorKey: "fechaFinalizacion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de finalización" />
    ),
    cell: ({ row }) => {
      const dateFin = row.original.fechaFinalizacion || row.original.fechaFin;
      if(!dateFin) return "-"
      return <div>{format(dateFin, 'd/MM/yyyy')}</div>;
    },
  },
  {
    id: "duracion",
    header: "Duración",
    cell: ({ row }) => {
      const inicio = row.original.fechaInicio;
      const final = row.original.fechaFinalizacion || row.original.fechaFin
      if (!inicio || !final) return "-";
    
      // get diff time in days using date-fns
      const duracion = intervalToDuration({start: new Date(inicio), end: new Date(final)})
      const duracionStr = formatDuration(duracion, { locale: es});
      return <div>{duracionStr}</div>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const hito = row.original;

      return (
        <div className="flex gap-2">
          {
            hito.idHito ? (
              <FeedbackChat tarea={hito as Hito} />
            ) : 
             (
              <FeedbackChat tarea={hito as Tarea} />
             )
          }
            
        </div>
      );
    },
  },
];
