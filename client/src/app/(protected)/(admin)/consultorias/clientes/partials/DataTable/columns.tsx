"use client";
import { Cliente } from "@/types/cliente";
import { ColumnDef } from "@tanstack/react-table";
import DeleteClienteDialog from "../Dialogs/DeleteClienteDialog";
import AddEditClienteDialog from "../Dialogs/AddEditClienteDialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
export const columns: ColumnDef<Cliente>[] = [
  {
    id: "nombre",
    accessorKey: "nombre",
    header: "Nombre",
    accessorFn: (cliente) => {
      return cliente.tipo_documento === "DNI"
        ? `${cliente.nombre} ${cliente.apellido}`
        : cliente.razonSocial;
    },

    filterFn: (rows, id, filterValue) => {
      if (rows.original.tipo_documento === "DNI") {
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
      return cliente.tipo_documento == "DNI" ? cliente.dni : cliente.ruc;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const cliente = row.original;

      return (
        <div className="flex items-center gap-2">
          <AddEditClienteDialog cliente={cliente} />
          <DeleteClienteDialog cliente={cliente} />
          <Link href={`/consultorias/clientes/${cliente.idCliente}`}>
            <Button className="h-fit py-1.5" variant="link" size={"sm"}>
              <Eye size={16} />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
