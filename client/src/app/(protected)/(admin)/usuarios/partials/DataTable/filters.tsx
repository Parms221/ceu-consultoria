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
    return (
        <div className="flex flex-wrap items-center py-4 [&>div]:space-y-1 gap-4">
            <div className="max-w-sm">
              <Label htmlFor="nombre">
                Buscar usuario
              </Label>
              <Input
                placeholder="Usuario"
                name="nombre"
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="w-full"
              />
            </div> 
            <div>
                <Label>Rol</Label>
                <Combobox
                    options={[
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
                    ]}
                    onSelect={(value) => {
                        table.getColumn("roles")?.setFilterValue(value)
                    }
                    }
                />
            </div>
            <div>
                <Label htmlFor="activo">Activo</Label>
                <Combobox
                    options={[
                      {
                        label: "Sí",
                        value: "si",
                      },{
                        label: "No",
                        value: "no",
                      }
                    ]}
                    onSelect={(value) => {
                        table.getColumn("enabled")?.setFilterValue(value === "si" ? true : value === "no" ? false : undefined)
                    }
                    }
                />
            </div>
        </div>
    );
}