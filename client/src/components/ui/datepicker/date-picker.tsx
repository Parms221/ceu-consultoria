"use client"
import { Button } from "../button";
import { FormControl } from "../form";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Calendar } from "../calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { es } from "date-fns/locale/es";
import { Matcher } from "react-day-picker";
import { useEffect, useRef, useState } from "react";

interface IDatePickerProps {
  field: ControllerRenderProps<any, any>;
  dateFormat?: string;
  placeholder?: string;
  disable?: Matcher | Matcher[] | undefined;
  onChange?: (date: Date | undefined) => void;
  useOpenState?: boolean;
}

export default function DatePicker({
  field,
  placeholder,
  dateFormat = "PPP",
  disable,
  onChange,
  useOpenState
}: IDatePickerProps) {
  const [open, setOpen ] = useState(false);

  return (
    <Popover open={useOpenState ? open : undefined}>
      <PopoverTrigger className="w-full" asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full min-w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
            onClick={() => useOpenState && setOpen(!open)}
          >
            {field.value ? (
              format(field.value, dateFormat, { locale: es })
            ) : (
              <span>{placeholder || "Selecciona una fecha"}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 block" align="start"> 
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(date) => {
              field.onChange(date);
              onChange && onChange(date);
            }}
            locale={es}
            disabled={disable}
            initialFocus
          />
      </PopoverContent>
    </Popover>
  );
}
