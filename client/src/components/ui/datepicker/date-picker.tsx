"use client";
import { Button } from "../button";
import { FormControl } from "../form";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Calendar } from "../calendar";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { es } from "date-fns/locale/es";
import { Matcher } from "react-day-picker";
import { useEffect, useRef, useState } from "react";
import { Input } from "../input";

interface IDatePickerProps {
  field: ControllerRenderProps<any, any>;
  dateFormat?: string;
  placeholder?: string;
  disable?: Matcher | Matcher[] | undefined;
  onChange?: (date: Date | DateRange | undefined) => void;
  useOpenState?: boolean;

  // props for range picker
  mode: "single" | "range";

  // para mostrar solo el calendario, sin input
  asIcon?: boolean;
}

interface DateRange {
  from: Date;
  to: Date;
}

export default function DatePicker({
  field,
  placeholder,
  dateFormat = "PPP",
  disable,
  onChange,
  useOpenState,
  mode = "single",
  asIcon,
}: IDatePickerProps) {
  const [open, setOpen] = useState(false);

  function formatValue(date: Date | DateRange | undefined) {
    if (!date) return "";

    if (mode === "single") {
      return format(date as Date, dateFormat, { locale: es });
    }
    date = date as DateRange;
    return `${format(date.from, dateFormat, { locale: es })} - ${format(date.to, dateFormat, { locale: es })}`;
  }

  return (
    <Popover open={useOpenState ? open : undefined}>
      <PopoverTrigger className="w-fit" asChild>
        {asIcon ? (
          <Button variant={"ghost"}>
            <CalendarIcon className="h-4 w-4 opacity-50" />
          </Button>
        ) : (
          <Button
            variant={"outline"}
            className={cn(
              "w-full min-w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
            onClick={() => useOpenState && setOpen(!open)}
          >
            {field.value ? (
              formatValue(field.value)
            ) : (
              <span>{placeholder || "Selecciona una fecha"}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="block h-[370px] w-auto p-0" align="start">
        <Calendar
          mode={mode}
          fromDate={new Date(2024, 1)}
          toDate={new Date(new Date(2034, 11))}
          captionLayout="dropdown-buttons"
          selected={field.value}
          onSelect={(date : any ) => {
            field.onChange(date);
            onChange && onChange(date);
          }}
          
          locale={es}
          disabled={disable}
          numberOfMonths={mode === "range" ? 2 : 1}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
