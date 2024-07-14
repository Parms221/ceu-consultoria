"use client";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2Icon } from "lucide-react";
import Link from "next/link";
// import DeleteUserDialog from "../Dialogs/DeleteUserDialog";
import { Hito } from "@/types/proyecto/Hito";
import { es } from "date-fns/locale/es";
import { formatDistance } from "date-fns";
import { WithSubRows } from "./data-table";
import { Tarea } from "@/types/proyecto/Tarea";


export const hitosColumns: ColumnDef<WithSubRows<Tarea>,Hito>[] = [
  {
    id: "titulo",
    accessorKey: "titulo",
    header: ({ table }) => (
      <>
      <button
        {...{
          onClick: table.getToggleAllRowsExpandedHandler(),
        }}
      >
        {table.getIsAllRowsExpanded() ? '👇' : '👉'}
      </button>{' '}
      First Name
    </>
    ),
    // cell: ({ row }) => {
    //   return <div className="w-[120px]">{row.original.titulo}</div>;
    // }
    cell: ({ row }) => (
      <div
        style={{
          // Since rows are flattened by default,
          // we can use the row.depth property
          // and paddingLeft to visually indicate the depth
          // of the row
          paddingLeft: `${row.depth * 2}rem`,
        }}
      >
        <div>
          {row.getCanExpand() ? (
            <button
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: 'pointer' },
              }}
            >
              {row.getIsExpanded() ? '👇' : '👉'}
            </button>
          ) : (
            '🔵'
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
      const date = new Date(row.original.fechaInicio);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "fechaFinalizacion",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de finalización" />
    ),
    cell: ({ row }) => {
      const dateFin = row.original.fechaFinalizacion || row.original.fechaFin
      const date = new Date(dateFin);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "duracion",
    header: "Duración",
    cell: ({ row }) => {
      const hito = row.original;
      const fechaInicio  = new Date(hito.fechaInicio);
      const dateFin = hito.fechaFinalizacion || hito.fechaFin
      const fechaFinalizacion  = new Date(dateFin);
      // get diff time in days using date-fns
      const diffDays = formatDistance(fechaInicio, fechaFinalizacion, { locale: es})
      return <div>{diffDays}</div>;
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
