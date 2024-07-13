"use client";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header";
import { Usuario } from "@/types/usuario";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import DeleteUserDialog from "../Dialogs/DeleteUserDialog";
import { formatRelative } from "date-fns";
import { es } from "date-fns/locale/es";

function getBadgeByRol(rol: string) {
  switch (rol) {
    case "ROLE_ADMIN":
      return <Badge variant="success">Administrador</Badge>;
    case "ROLE_CLIENTE":
      return <Badge variant="ghost">Cliente</Badge>;
    case "ROLE_CONSULTOR":
      return <Badge variant="default">Consultor</Badge>;
    default:
      return <Badge variant="outline">Sin rol</Badge>;
  }
}

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
    accessorKey: "roles",
    id: "roles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({ row }) => {
      const roles = row.original.roles;
      return getBadgeByRol(roles[0].rol ?? "");
    },
    filterFn: (rows, id, value) => {
      const original = rows.original.roles;
      return original.some((rol) => rol.rol.toLowerCase() === value);
    },
    sortingFn: (rowA, rowB) => {
      const roleA =
        rowA.original.roles && rowA.original.roles[0].rol.toLowerCase();
      const roleB =
        rowB.original.roles && rowB.original.roles[0].rol.toLowerCase();
      return roleA > roleB ? 1 : roleA < roleB ? -1 : 0;
    },
  },
  {
    accessorKey: "enabled",
    id: "enabled",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Activo" />
    ),
    cell: ({ row }) => {
      const usuario = row.original;
      return (
        <Badge variant={usuario.enabled ? "success" : "ghost"}>
          {usuario.enabled ? "Sí" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última actualización" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      return (
        // <relative-time datetime={date.toISOString()} lang="es">
        //   <div className="h-4 w-full animate-pulse bg-accent"></div>
        // </relative-time>
        formatRelative(date, new Date(), { locale: es })
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de creación" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <div>{date.toLocaleString()}</div>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-2">
          <Link href={`/usuarios/${user.id}`}>
            <Button className="h-fit py-1.5" variant="link" size={"sm"}>
              <Edit size={16} />
            </Button>
          </Link>
          {user.roles[0].rol !== "ROLE_ADMIN" && (
            <DeleteUserDialog user={user} />
          )}
        </div>
      );
    },
  },
];
