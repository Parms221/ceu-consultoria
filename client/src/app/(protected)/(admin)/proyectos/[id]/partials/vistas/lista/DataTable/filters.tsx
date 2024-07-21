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
    const ROL_OPTIONS = [
        {
          id: 3,
          label: "Administrador",
          value: "role_admin",
        },
        {
          id: 1,
          label: "Consultor",
          value: "role_consultor",
        },
        {
          id: 2,
          label: "Cliente",
          value: "role_cliente",
        },
    ]

    return (
        <div className="flex flex-wrap items-center py-4 [&>div]:space-y-1 gap-4">
            <div className="max-w-sm">
              <Label htmlFor="hito">
                Buscar tarea
              </Label>
              <Input
                placeholder="Tarea"
                name="titulo"
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
                    options={ROL_OPTIONS}
                    onSelect={(value) => {
                        table.getColumn("estado")?.setFilterValue(value)
                    }
                    }
                />
            </div>
        </div>
    );
}