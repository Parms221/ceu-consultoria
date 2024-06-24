"use client";
import { Servicio } from "@/types/servicio";
import { ColumnDef } from "@tanstack/react-table";
import DeleteServicioDialog from "../Dialogs/DeleteServicioDialog";
import AddEditServicioDialog from "../Dialogs/AddEditServicioDialog";
export const columns: ColumnDef<Servicio>[] = [
  {
    id: "nombre",
    accessorKey: "nombre",
    header: "Nombre",
    accessorFn: (servicio) => {
      return servicio.tipo_documento === "DNI"
        ? `${servicio.nombre} ${servicio.apellido}`
        : servicio.razonSocial;
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
    accessorFn: (servicio) => {
      return servicio.tipo_documento == "DNI" ? servicio.dni : servicio.ruc;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const servicio = row.original;

      return (
        <div className="flex gap-2">
          <AddEditServicioDialog servicio={servicio} />
          <DeleteServicioDialog servicio={servicio} />
        </div>
      );
    },
  },
];
