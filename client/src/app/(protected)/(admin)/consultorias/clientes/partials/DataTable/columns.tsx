"use client";
import { Button } from "@/components/ui/button";
import { Cliente } from "@/types/cliente";
import { ColumnDef } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import Link from "next/link";
import DeleteClientDialog from "../dialogs/delete";
export const columns: ColumnDef<Cliente>[] = [
  {
    id: "nombre",
    accessorKey: "nombre",
    header: "Nombre",
    accessorFn: (cliente) => {
      return cliente.tipo === "NATURAL"
        ? `${cliente.nombre} ${cliente.apellido}`
        : cliente.razonSocial;
    },

    filterFn: (rows, id, filterValue) => {
      if (rows.original.tipo === "NATURAL") {
        return `${rows.original.nombre} ${rows.original.apellido} ${rows.original.dni}`
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }
      return `${rows.original.razonSocial} ${rows.original.ruc}`
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    id: "tipo_documento",
    accessorKey: "tipo_documento",
    header: "Tipo de documento",
  },
  {
    id: "documento",
    header: "Documento",
    accessorKey: "documento",
    accessorFn: (cliente) => {
      return cliente.tipo === "NATURAL" ? cliente.dni : cliente.ruc;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const cliente = row.original;

      return (
        <div className="flex gap-2">
          <Link href={`/clientes/${cliente.cliente_id}`}>
            <Button className="h-fit py-1.5" variant="link" size={"sm"}>
              <Edit size={16} />
            </Button>
          </Link>
          <DeleteClientDialog cliente={cliente} />
        </div>
      );
    },
  },
];
