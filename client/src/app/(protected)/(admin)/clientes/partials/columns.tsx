"use client"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header"
import { Usuario } from "@/types/usuario"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2Icon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
  },
  {
    accessorKey: "rol",
    id: "rol",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Rol" />
    )
  },
  {
    accessorKey: "enabled",
    id: "enabled",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Activo" />
    ),
    cell: ({row}) => {
      const usuario = row.original
      return (  
          <Badge variant={usuario.enabled ? "success" : "ghost"}>
            {usuario.enabled ? "Sí" : "No"}
          </Badge>
      )
    } 
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <div className="flex gap-2">
          <Button className="py-1.5 h-fit" variant="default" size={"sm"}>
            <Edit size={16}/>
          </Button>
          <Button className="py-1.5 h-fit" variant="default" size={"sm"} >
            <Trash2Icon size={16} />
          </Button>
        </div>
      )
    },
  },
]
