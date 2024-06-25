"use client";
import { Servicio } from "@/types/servicio";
import { ColumnDef } from "@tanstack/react-table";
import DeleteServicioDialog from "../Dialogs/DeleteServicioDialog";
import AddEditServicioDialog from "../Dialogs/AddEditServicioDialog";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronDown } from "lucide-react"

export const columns: ColumnDef<Servicio>[] = [
  {
    id: "titulo",
    accessorKey: "titulo",
    header: "Título",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "precio",
    header: "Cotización",
    cell: ({ row }) => {
      const service = row.original as Servicio;
      return service.precio.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' });
    }
  },
  {
    accessorKey: "entregablesDelServicio",
    header: "Entregables",
    cell: ({ row }) => {
      const service = row.original as Servicio;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} size={"sm"}>
            Ver entregables <ChevronDown size={16} strokeWidth={1}/>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-accent dark:bg-bodydark dark:text-white mt-1 p-4 rounded-md shadow-lg z-[50]">
            <ul className="space-y-2">
              {service.entregablesDelServicio.map(({titulo}) => {
                return (
                  <li key={titulo}
                    className="flex gap-2"
                  >
                    <CheckCircle className="shrink-0" />
                    <span>{titulo} awdawdwdwd</span>
                  </li>  
                )
              })}
            </ul>
          </PopoverContent>
        </Popover>
      )
    }
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
