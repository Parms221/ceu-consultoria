"use client";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2Icon, ChevronRight } from "lucide-react";
import { Hito } from "@/types/proyecto/Hito";
import { es } from "date-fns/locale/es";
import { format, formatDuration, intervalToDuration, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { SubTarea, Tarea } from "@/types/proyecto/Tarea";


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
      return <div>{
        format(date, 'd/MM/yyyy')
        }</div>;
    },
  },
  {
    accessorKey: "fechaFinalizacion",
    header: "Fecha de finalización",
    cell: ({ row }) => {
      const dateFin = row.original.fechaFin;
      if(!dateFin) return "-"
      return <div>{format(dateFin, 'd/MM/yyyy')}</div>;
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
      const duracionStr = formatDuration(duracion, { locale: es});
      return {duracionStr};
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const tarea = row.original;

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => console.log("Editando tarea", tarea.idTarea)}
          >
            <Edit size={20} />
          </Button>
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => console.log("Eliminando tarea", tarea.idTarea)}
          >
            <Trash2Icon size={20} />
          </Button>  
        </div>
      );
    },
  },
];
