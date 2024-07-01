import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Table } from "@tanstack/react-table";

interface DataTableFiltersProps<TData> {
    table: Table<TData>
  }
export default function Filters<TData>(
    {
        table
    } : DataTableFiltersProps<TData>
) {
    const ESTADO_OPTIONS = [
        {
          id: 3,
          label: "Terminado",
          value: "terminado",
        },
        {
          id: 1,
          label: "En progreso",
          value: "en_progreso",
        },
        {
          id: 2,
          label: "Cancelado",
          value: "cancelado",
        },
    ]

    return (
        <div className="flex flex-wrap items-center py-4 [&>div]:space-y-1 gap-4">
            <div className="max-w-sm">
              <Label htmlFor="nombre">
                Buscar por título de proyecto
              </Label>
              <Input
                placeholder="Proyecto 1"
                name="proyecto"
                value={(table.getColumn("titulo")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("titulo")?.setFilterValue(event.target.value)
                }
                className="w-full"
              />
            </div> 
            <div>
                <Label>Estado</Label>
                <Combobox
                    options={ESTADO_OPTIONS}
                    onSelect={(value) => {
                        table.getColumn("estado")?.setFilterValue(value)
                    }
                    }
                />
            </div>
        </div>
    );
}