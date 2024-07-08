import { Button } from "../button";
import { FormControl } from "../form";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Calendar } from "../calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { es } from 'date-fns/locale/es';

interface IDatePickerProps {
  field: ControllerRenderProps<any>;
  dateFormat?: string;
  placeholder?: string;
}

export default function DatePicker({
  field,
  placeholder,
  dateFormat = "PPP",
}: IDatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger className="w-full" asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full min-w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground",
            )}
          >
            {field.value ? (
              format(field.value, dateFormat, {locale: es})
            ) : (
              <span>{placeholder || "Selecciona una fecha"}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          locale={es}
          //   disabled={(date) =>
          //     date > new Date() || date < new Date("1900-01-01")
          //   }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
