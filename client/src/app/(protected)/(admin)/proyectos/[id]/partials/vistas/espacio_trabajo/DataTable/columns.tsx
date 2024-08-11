"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
// import DeleteUserDialog from "../Dialogs/DeleteUserDialog";
import { File, Link as LinkIcon, Download, SquareArrowOutUpRight} from "lucide-react";
import { Recurso } from "@/types/proyecto/Recurso";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import useRecurso from "@/hooks/Recurso/useRecurso";
import DeleteRecursoDialog from "../partials/dialog/delete_recurso_dialog";
import { useSession } from "next-auth/react";
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header";

function getBadgeByTipoRecurso(esArchivo: boolean) {
  if(esArchivo){
    return <Badge variant="success" className="py-1 px-3"><File size={14}/> <span className="w-1"></span> Archivo</Badge>;
  }
  return <Badge variant="default"><LinkIcon size={14} /> <span className="w-1"></span> Enlace</Badge>;  
}

function getBadgeAcceso(recurso: Recurso) {
  const { descargarRecurso } = useRecurso();
  if (recurso.esArchivo) {
    return <Button className="py-0 px-3" variant="outline" onClick={() => descargarRecurso(recurso)}>
      <Download className="mr-2 w-4" /> Descargar
    </Button>  
  }
  return <Link href={recurso.enlace!} className={buttonVariants({ variant: "outline" })} target="_blank">
    <SquareArrowOutUpRight className="mr-2 w-4" /> Abrir
  </Link >
  
}

export const columns: ColumnDef<Recurso>[] = [
  {
    accessorKey: "titulo",
    id: "titulo",
    header: "Título",
  },
  {
    accessorKey: "esArchivo",
    id: "tipo",
    header: "Tipo",
    cell: ({row}) => {
      const tipo = row.original.esArchivo
      return getBadgeByTipoRecurso(tipo ?? true);
    }
  },
  {
    accessorKey: "propietario.name",
    id: "usuario",
    header: "Propietario",
  },
  {
    accessorKey: "enlace",
    id: "enlace",
    header: "Acceso",
    cell: ({row}) => {
      return getBadgeAcceso(row.original);
    }
  },
  // {
  //   accessorKey: "esArchivo",
  //   id: "roles",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Rol" />
  //   ),
  //   cell: ({ row }) => {
  //     const roles = row.original.roles;
  //     return getBadgeByRol(roles[0].rol ?? "");
  //   },
  //   filterFn: (rows, id, value) => {
  //     const original = rows.original.roles;
  //     return original.some((rol) => rol.rol.toLowerCase() === value);
  //   },
  //   sortingFn: (rowA, rowB) => {
  //     const roleA =
  //       rowA.original.roles && rowA.original.roles[0].rol.toLowerCase();
  //     const roleB =
  //       rowB.original.roles && rowB.original.roles[0].rol.toLowerCase();
  //     return roleA > roleB ? 1 : roleA < roleB ? -1 : 0;
  //   },
  // },
  // {
  //   accessorKey: "enabled",
  //   id: "enabled",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Activo" />
  //   ),
  //   cell: ({ row }) => {
  //     const usuario = row.original;
  //     return (
  //       <Badge variant={usuario.enabled ? "success" : "ghost"}>
  //         {usuario.enabled ? "Sí" : "No"}
  //       </Badge>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "updatedAt",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Última actualización" />
  //   ),
  //   cell: ({ row }) => {
  //     const date = new Date(row.original.updatedAt);
  //     return (
  //       // <relative-time datetime={date.toISOString()} lang="es">
  //       //   <div className="h-4 w-full animate-pulse bg-accent"></div>
  //       // </relative-time>
  //       formatRelative(date, new Date(), { locale: es })
  //     );
  //   },
  // },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de subida" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt!);
      return <div>{date.toLocaleString()}</div>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const recurso = row.original;

      return (
        <div className="flex gap-2">
          {/* <Link href={`/recursos/${recurso.idRecurso}`}>
            <Button className="h-fit py-1.5" variant="link" size={"sm"}>
              <Edit size={16} />
            </Button>
          </Link> */}
          <DeleteRecursoDialog recurso={recurso}/>
          {/* {user.roles[0].rol !== "ROLE_ADMIN" && (
            <DeleteUserDialog user={user} />
          )} */}
        </div>
      );
    },
  },
];