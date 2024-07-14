import { Column, Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { isValid, parse, parseISO } from "date-fns";
import DatePicker from "../../datepicker/date-picker";

export default function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  
  return firstValue && typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 rounded border shadow"
      />
      <Input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Máx`}
        className="w-24 rounded border shadow"
      />
    </div>
  ) : (
    typeof firstValue === "string" &&  (
        isValid(parseISO(firstValue)) ? (
            <Input
                type="date"
                value={(columnFilterValue ?? "") as string}
                onChange={(e) => column.setFilterValue(e.target.value)}
                placeholder={`Buscar`}
                className="w-full h-[25px] px-3 py-0 rounded border shadow mt-1"
          />
        ): (  <Input
            type="text"
            value={(columnFilterValue ?? "") as string}
            onChange={(e) => column.setFilterValue(e.target.value)}
            placeholder={`Buscar`}
            className="w-full h-[12px] p-3 rounded border shadow"
          />)
    )
  );
}
