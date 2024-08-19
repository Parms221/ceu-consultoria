"use client"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2Icon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Proyecto } from "@/types/proyecto"
import DeleteProjectDialog from "../dialogs/delete"
import { GetClienteName } from "@/types/cliente"
import { formatRelative } from "date-fns"
import { es } from "date-fns/locale/es"
import useProyecto from "@/hooks/Proyecto/useProyecto"


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
          formatRelative(date, new Date(), { locale: es })
        )
      )
    }
  },
  {
    accessorKey: "estado",
    id: "estado",
    header: "Estado",
    cell: ({ row }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {  getBadgeByStatus } = useProyecto();

      const proyecto = row.original
      return getBadgeByStatus(proyecto.estado)
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
