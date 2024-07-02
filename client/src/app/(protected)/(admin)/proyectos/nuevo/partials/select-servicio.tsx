"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProjectForm } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/form.context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { fetcherLocal } from "@/server/fetch/client-side";
import { useState } from "react";
import { Cliente, GetClienteName } from "@/types/cliente";
import {
  BoltIcon,
  Check,
  ChevronsUpDown,
  CrossIcon,
  UserIcon,
} from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Servicio } from "@/types/servicio";

export default function SelectServicio() {
  const { form } = useProjectForm();

  const dataQuery = useQuery<Servicio[]>({
    queryKey: ["servicios"],
    queryFn: async () => {
      const response = await fetcherLocal("/servicios");

      if (!response.ok) {
        throw new Error("Error fetching services");
      }

      return response.json();
    },
  });

  return (
    <div className={""}>
      <FormField
        control={form.control}
        name="idServicio"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-3">
            <FormLabel className="flex w-[80px] items-center gap-1 text-black">
              <BoltIcon size={18} />
              Servicio
            </FormLabel>

            <Popover>
              {dataQuery.isLoading ? (
                <Button
                  variant="ghost"
                  role="combobox"
                  size={"sm"}
                  disabled={true}
                  className={cn("w-[200px] justify-between bg-bodydark/20")}
                >
                  Cargando...
                </Button>
              ) : dataQuery.isError || !dataQuery.data ? (
                <Button
                  variant="ghost"
                  role="combobox"
                  size={"sm"}
                  disabled={true}
                  className={cn("w-[200px] justify-between bg-bodydark/20")}
                >
                  Error!!
                </Button>
              ) : (
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="ghost"
                      size={"sm"}
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between bg-bodydark/10",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? (function () {
                            const servicio = dataQuery.data.find(
                              (servicio) => servicio.idServicio === field.value,
                            );

                            if (servicio) {
                              return servicio.titulo;
                            }

                            return "algo";
                          })()
                        : "Selecciona un valor ..."}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
              )}
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar cliente..." />
                  <CommandEmpty>Servicio no encontrado</CommandEmpty>
                  <CommandGroup>
                    {dataQuery.data && dataQuery.data.length == 0 ? (
                      <CommandItem value={String(0)} key={0}>
                        No hay servicios
                      </CommandItem>
                    ) : (
                      dataQuery.data?.map((servicio) => (
                        <CommandItem
                          value={String(servicio.idServicio)}
                          key={servicio.titulo}
                          onSelect={() => {
                            form.setValue("idServicio", servicio.idServicio);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              servicio.idServicio === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          {servicio.titulo}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {field.value != 0 && (
              <Button
                type={"button"}
                variant={"ghost"}
                className={"h-6 w-6 p-0"}
                onClick={() => {
                  field.onChange(0);
                }}
              >
                <Cross2Icon className={"h-4"} />
              </Button>
            )}

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
