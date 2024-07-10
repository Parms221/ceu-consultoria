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
        <Label htmlFor="nombre">Buscar Cliente</Label>
        <Input
          placeholder="Cliente"
          name="nombre"
          value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nombre")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
      </div>
      <div>
        <Label>Tipo de Documento</Label>
        <Combobox
          options={[
            {
              label: "RUC",
              value: "RUC",
            },
            {
              label: "DNI",
              value: "DNI",
            },
          ]}
          onSelect={(value) => {
            table.getColumn("tipo_documento")?.setFilterValue(value);
          }}
        />
      </div>
    </div>
  );
}
