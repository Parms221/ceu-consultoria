"use client"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header"
import { Usuario } from "@/types/usuario"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2Icon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import '@github/relative-time-element';
import { Proyecto } from "@/types/proyecto"
import DeleteProjectDialog from "../dialogs/delete"
import { GetClienteName } from "@/types/cliente"

function getBadgeByStatus(status: string){
    switch(status){
      case "Terminado":
        return <Badge variant="success">{status}</Badge>
      case "En progreso":
        return <Badge variant="ghost">{status}</Badge>
      case "Cancelado":
        return <Badge variant="destructive">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
}

export const columns: ColumnDef<Proyecto>[] = [
  {
    accessorKey: "titulo",
    id: "titulo",
    header: "Proyecto",
  },
  {
    accessorKey: "cliente",
    id: "cliente",
    header: "Cliente",
    cell: ({ row }) => {
      const proyecto = row.original
      return GetClienteName(proyecto.cliente)
    }
  },
  {
    accessorKey: "participantes",
    id: "participantes",
    header: "Consultores",
    cell: ({ row }) => {
      const proyecto = row.original
      return proyecto.participantes?.length ?? 0
    }
  },
  {
    accessorKey: "fechaInicio",
    id: "fechaInicio",
    header: "Fecha de inicio",
    cell: ({ row }) => {
      const proyecto = row.original
      return new Date(proyecto.fechaInicio).toLocaleDateString()
    }
  },
  {
    accessorKey: "fechaLimite",
    id: "fechaLimite",
    header: "Fecha límite",
    cell: ({ row }) => {
      const proyecto = row.original
      return new Date(proyecto.fechaLimite).toLocaleDateString()
    }
  },
  {
    accessorKey: "updatedAt",
    id: "updatedAt",
    header: "Última actualización",
    cell: ({ row }) => {
      const lastUpdate = row.original.updatedAt
      let date = null
      if (lastUpdate)
        date = new Date(lastUpdate)
      return (
        date && (
          <relative-time 
            datetime={date.toISOString()}
            lang="es"
          >
            <div className="w-full h-4 bg-accent animate-pulse"></div>
          </relative-time>
        )
      )
    }
  },
  {
    accessorKey: "estado",
    id: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const proyecto = row.original
      return getBadgeByStatus(proyecto.estado.descripcion)
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const proyecto = row.original
 
      return (
        <div className="flex gap-2">
          <Link
            href={`/proyectos/${proyecto.idProyecto}`}
          >
            <Button className="py-1.5 h-fit" variant="link" size={"sm"}>
              <Edit size={16}/>
            </Button>
          </Link>
          <DeleteProjectDialog proyecto={proyecto} />
        </div>
      )
    },
  },
]
