import { ChangeEvent, forwardRef, useEffect, useState } from "react";
import { Input } from "../../input";
import { Column, Getter, Row, Table } from "@tanstack/react-table";
import DatePicker from "../../datepicker/date-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

interface IEditableCellProps {
  getValue: Getter<any>;
  row: Row<any>;
  column: any;
  table: any;
}

type Option = {
  label: string;
  value: string;
};

const EditableCell = ({ getValue, row, column, table }: IEditableCellProps) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // When the input is blurred, we'll call our table meta's updateData function
  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
        <select onChange={onSelectChange} value={initialValue}>
        {columnMeta?.options?.map((option: Option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </select>
    ) : columnMeta?.type === "datetime" ? (
        <DatePicker 
            mode ="single"
            onChange={(date) => {
              setValue(date);
              tableMeta?.updateData(row.index, column.id, date);
            }}
            field={
            {
                value: value,
                onChange: setValue,
                onBlur: onBlur,
                name: column.id,
                ref: forwardRef,
            }}
        />
    ) : (
        <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        className="overflow:hidden text-ellipsis text-nowrap"
        type={column.columnDef.meta?.type || "text"}
        />
    );
  }
  // If the row is not being edited, we'll just return
  return columnMeta?.type === "datetime" || columnMeta?.type === "date"  ? (
    <span>{value ? format(value, columnMeta.format, { locale : es}) : ""}</span>
  ) : value ;
};
export default EditableCell;
