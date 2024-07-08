"use client";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header";
import { Usuario } from "@/types/usuario";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
// import DeleteUserDialog from "../Dialogs/DeleteUserDialog";
import "@github/relative-time-element";
import { Hito } from "@/types/proyecto/Hito";

export const hitosColumns: ColumnDef<Hito>[] = [
  {
    id: "hito",
    accessorKey: "titulo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hito" />
    )
  },
  {
    accessorKey: "fechaInicio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de inicio" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.fechaInicio);
      return <div>{date.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "fechaFinalizacion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de finalización" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.fechaFinalizacion);
      return <div>{date.toLocaleString()}</div>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const hito = row.original;

      return (
        <div className="flex gap-2">
          <Link href={`/usuarios/${hito.idHito}`}>
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
