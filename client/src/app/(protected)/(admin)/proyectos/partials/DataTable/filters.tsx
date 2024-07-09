import { Combobox } from "@/components/ui/combobox";
import { SearchBarDatatable } from "@/components/ui/DataTable/filters/search-field";
import { Label } from "@/components/ui/label";

export default function Filters() {
  const ESTADO_OPTIONS = [
    {
      id: 3,
      label: "Terminado",
      value: "terminado"
    },
    {
      id: 1,
      label: "En progreso",
      value: "en_progreso"
    },
    {
      id: 2,
      label: "Cancelado",
      value: "cancelado"
    }
  ];

  return (
    <div className="flex flex-wrap items-center py-4 [&>div]:space-y-1 gap-4">
      <div className="max-w-sm">
        <Label>Título</Label>
        <SearchBarDatatable />
      </div>
      <div>
        <Label>Estado</Label>
        <Combobox
          options={ESTADO_OPTIONS}
        />
      </div>
    </div>
  );
}