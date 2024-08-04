"use client"
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { projectDetailSchema } from "../../schemas/project-detail.schema";
import { useQuery } from "@tanstack/react-query";
import { Servicio } from "@/types/servicio";
import { fetcherLocal } from "@/server/fetch/client-side";
import { z } from "zod";
import { useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import DatePicker from "@/components/ui/datepicker/date-picker";
import { Check, CheckCircle2 } from "lucide-react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

export default function SelectServicio({
    form,
  }: {
    form: UseFormReturn<z.infer<typeof projectDetailSchema>, any, undefined>;
  }) {
    const {
      fields : hitosFields,
      append: appendHito,
      remove: removeHito,
    } = useFieldArray({
      control: form.control,
      name: "hitos",
    })
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
  
    const watchServicio = form.watch("servicioId");
  
    useEffect(() =>{
      console.log("Servicio seleccionado: "+watchServicio)
      // Clear hitos fields
      for (let index = hitosFields.length; index >= 0; index--) {
        removeHito(index);
      }
      //
      if(watchServicio){
        if(!dataQuery.data) return;
        const existingServicio = dataQuery.data.find(s => s.idServicio === watchServicio);
        if(existingServicio){
          const entregables = existingServicio.entregablesDelServicio
          entregables.forEach(entregable => {
            appendHito({
             titulo: entregable.titulo,
              fechas : {
                from: undefined,
                to: undefined,
              },
             tareas: []
            })
          })
        }
      }
    }, [
      watchServicio, dataQuery.data
    ])
  
    // Para formatear las fechas de inicio y fin a date time 
    const formatDateTimeRange = (index : number) => {
        const fechas = form.watch(`hitos.${index}.fechas`) || {};
        const inicio = fechas.from;
        const fin = fechas.to;
        if (!inicio || !fin) 
            return (
                <span>Seleccione una fecha de inicio y fin para este entregable</span>
            );
        
        const formato = "d 'de' MMMM 'del' yyyy h:mm a";
        return (
            <span>
                {`${format(new Date(inicio), formato, { locale: es })} - ${format(new Date(fin), formato, { locale: es })}`} 
            </span>
        );
      };

    return (
      <div className={"space-y-3"}>
        <h3 className="text-xl font-bold text-primary">Servicio</h3>
        <FormField
          control={form.control}
          name="servicioId"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-3">
              <Popover>
                {dataQuery.isLoading ? (
                  <Button
                    variant="ghost"
                    role="combobox"
                    size={"sm"}
                    disabled={true}
                    className={cn("w-full justify-between border border-input")}
                  >
                    Cargando...
                  </Button>
                ) : dataQuery.isError || !dataQuery.data ? (
                  <Button
                    variant="ghost"
                    role="combobox"
                    size={"sm"}
                    disabled={true}
                    className={cn("w-full justify-between border border-input")}
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
                          "w-full justify-between border border-input",
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
                          : "Selecciona un servicio"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                )}
                <PopoverContent className="w-[200px] p-0" align={"start"}>
                  <Command>
                    <CommandInput placeholder="Buscar servicio..." />
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
                            key={servicio.idServicio}
                            onSelect={() => {
                              form.setValue("servicioId", servicio.idServicio);
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
        <h3 className="text-black">Entregables</h3>
        {
          hitosFields.map((field, index) => {
            return (
                <div className="flex flex-col" key={field.id}>
                    <div className="flex gap-1.5 items-center">
                      <CheckCircle2 />
                      <span className="text-ceu-celeste">
                        {field.titulo}
                      </span>
                      <FormField 
                        control={form.control}
                        name={`hitos.${index}.fechas`}
                        render={({field}) => (
                            <FormItem className="flex-1">
                            <FormControl>
                                <DatePicker mode="range" field={field} asIcon/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="text-sm leading-none">
                        {formatDateTimeRange(index)}     
                    </div>            
                </div>
            )
          })
        }
      </div>
    );
  }
  