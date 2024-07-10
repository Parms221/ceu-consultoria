import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Table } from "@tanstack/react-table";

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
}
export default function Filters<TData>({
  table,
}: DataTableFiltersProps<TData>) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4 [&>div]:space-y-1">
      <div className="max-w-sm">
        <Label htmlFor="nombre">Buscar Servicio</Label>
        <Input
          placeholder="Servicio"
          name="nombre"
          value={(table.getColumn("titulo")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("titulo")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
      </div>
    </div>
  );
}
