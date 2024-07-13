"use client";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2Icon } from "lucide-react";
import Link from "next/link";
// import DeleteUserDialog from "../Dialogs/DeleteUserDialog";
import { Tarea } from "@/types/proyecto/Tarea";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale/es";

export const tareasColumns: ColumnDef<Tarea>[] = [
  {
    id: "titulo",
    accessorKey: "titulo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tareas" className="pl-4"/>
    ),
    cell: ({ row }) => {
      return <div className="w-[120px] text-center">{row.original.titulo}</div>;
    }
  },
  {
    accessorKey: "fechaInicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de inicio" className="invisible"/>
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.fechaInicio);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "fechaFin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de finalización" className="invisible" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.fechaFin);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "duracion",
    header: ({column}) => (
      <div className="invisible">Duración</div>
    ),
    cell: ({ row }) => {
      const hito = row.original;
      const fechaInicio  = new Date(hito.fechaInicio);
      const fechaFinalizacion  = new Date(hito.fechaFin);
      const diffDays = formatDistance(fechaInicio, fechaFinalizacion, { locale: es });
      return <div>{diffDays}</div>;
    },
  },
  {
    id: "actions",
    header: ({column}) => (
      <div className="invisible">Acciones</div>
    ),
    cell: ({ row }) => {
      const tarea = row.original;

      return (
        <div className="flex gap-2">
          <Link href={`/usuarios/${tarea.idTarea}`}>
            <Button className="h-fit py-1.5" variant="link" size={"sm"}>
              <Edit size={16} />
            </Button>
          </Link>
            {/* <DeleteUserDialog user={user} /> */}
        </div>
      );
    },
  },
];
