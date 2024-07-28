"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useState } from "react";

type Props = {
  value? : string
  options: {
    label: string
    value: string
    id?: number | string
  }[]
  placeholder?: string
  onSelect?: (value: string, id?: number | string) => void
  isDisabled?: boolean
}

export function Combobox(
  { options, onSelect, isDisabled, placeholder, value }: Props
) {
  const [open, setOpen] = useState(false);
  const [newValue, setValue] = useState(value);

  return (
    <Popover
      open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={isDisabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {newValue
            ? options.find((option) => option.value.toLowerCase() === newValue.toLowerCase())?.label
            : placeholder || "Seleccione una opción"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start"
      >
        <Command>
          <CommandInput placeholder="Buscar opción" />
          <CommandEmpty>Opción no encontrada</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue: string) => {
                  onSelect?.(currentValue == newValue ? "" : currentValue, option.id);
                  setValue(currentValue == newValue ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    newValue === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}