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
import { Check, ChevronsUpDown, CrossIcon, UserIcon } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function SelectClient() {
  const { form } = useProjectForm();

  const dataQuery = useQuery<Cliente[]>({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await fetcherLocal("/clientes");

      if (!response.ok) {
        throw new Error("Error fetching clients");
      }

      return response.json();
    },
  });

  return (
    <div className={""}>
      <FormField
        control={form.control}
        name="idCliente"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-3">
            <FormLabel className="flex w-[80px] items-center gap-1 text-black">
              <UserIcon size={18} />
              Cliente
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
                            const client = dataQuery.data.find(
                              (cliente) => cliente.idCliente === field.value,
                            );

                            if (client) {
                              return GetClienteName(client);
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
                  <CommandEmpty>Cliente no encontrado</CommandEmpty>
                  <CommandGroup>
                    {dataQuery.data && dataQuery.data.length == 0 ? (
                      <CommandItem value={String(0)} key={0}>
                        No hay clientes
                      </CommandItem>
                    ) : (
                      dataQuery.data?.map((client) => (
                        <CommandItem
                          value={String(client.idCliente)}
                          key={GetClienteName(client)}
                          onSelect={() => {
                            form.setValue("idCliente", client.idCliente);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              client.idCliente === field.value
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                          <div>
                            <p>{GetClienteName(client)}</p>
                            <p className="text-xs font-semibold">
                              {client.tipo_documento}
                              {": "}
                              {client.tipo_documento == "DNI"
                                ? client.dni
                                : client.ruc}
                            </p>
                          </div>
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
