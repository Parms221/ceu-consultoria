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
import { format, formatDuration, intervalToDuration, isBefore, startOfDay } from "date-fns";
import { es } from "date-fns/locale/es";
import TimeInput from "@/components/ui/input-time";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";

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
    const { data: servicios, isLoading, isError} = useQuery<Servicio[]>({
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
      // Clear hitos fields
      for (let index = hitosFields.length; index >= 0; index--) {
        removeHito(index);
      }
      //
      if(watchServicio){
        if(!servicios) return;
        const existingServicio = servicios.find(s => s.idServicio === watchServicio);
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
      watchServicio, servicios
    ])
    
    // Para formatear las fechas de inicio y fin a date time y duración
    const formatDateTimeRange = (index : number) => {
        const fechas = form.watch(`hitos.${index}.fechas`) || {};
        const inicio = fechas.from;
        const fin = fechas.to;
        if (!inicio || !fin || !inicio.getTime() || !fin.getTime())
            return <span
              className={`${form.getFieldState(`hitos.${index}.fechas`).error ? "text-red" : ""}`}
            >Seleccione un rango de fechas de inicio y fin para el entregable</span>;
        
        const formato = "d 'de' MMMM 'del' yyyy";
        return (
            <>
              <div className="flex items-center gap-1.5">
                <span>
                  Desde :
                </span>
                {`${format(new Date(inicio), formato, { locale: es })}`} 
                <TimeInput
                  value={inicio}
                  onChange={(date) => {
                    form.setValue(`hitos.${index}.fechas.from`, date);
                  }}
                  className="w-fit h-fit px-0.5 py-0"
                />
                  
              </div>
              <div className="flex items-center gap-1.5">
                  <span>
                    Hasta :
                  </span>
                  {`${format(new Date(fin), formato, { locale: es })}`} 
                  <TimeInput 
                    className="w-fit h-fit px-0.5 py-0"
                    value={fin} 
                    onChange={(date) => {
                      form.setValue(`hitos.${index}.fechas.to`, date);
                    }}
                  />
              </div>
              <div>
                <span>Duración: </span>
                {`${formatDuration(
                    intervalToDuration({start: new Date(inicio), end: new Date(fin)}),
                    {locale: es}
                  )}
                `}
              </div>
            </>
        );
      };

    return (
      <div className={"space-y-3"}>
        <h3 className="text-xl font-bold text-primary">Entregables del proyecto y cotización</h3>
       <div className="flex flex-wrap gap-4">
        <FormField
            control={form.control}
            name="servicioId"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full sm:w-[350px]">
                <FormLabel>Servicio</FormLabel> 
                <Combobox
                      placeholder="Seleccione un servicio"
                      value={field.value.toString()}
                      options={servicios ? servicios.map(s => ({
                        label: s.titulo,
                        value: String(s.idServicio)
                      })) : []}
                      onSelect={(value) => {
                        form.setValue("servicioId", Number(value));
                      }}
                    />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Cotización base según el servicio seleccionado */}
          <FormField
              control={form.control}
              name="precio"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex flex-col gap-2">
                    <FormLabel>Cotización {"(S/)"}</FormLabel>
                    <div className="flex gap-0.5">
                      <Input
                        {...field}
                        className="sm:w-fit"
                        placeholder="S/ 0.0"
                      />
                    </div>
                    </div>
                  <FormMessage />
                </FormItem>
              )}
            />  
       </div>
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
                                <DatePicker mode="range" field={field} asIcon
                                  disable={(date) =>{
                                    return (
                                      isBefore(startOfDay(date), startOfDay(new Date()))
                                    )
                                  }}
                                />
                            </FormControl>
                            </FormItem>
                            )}
                        />
                    </div>
                    <div className="text-sm leading-none space-y-2">
                        {formatDateTimeRange(index)}    
                    </div>            
                </div>
            )
          })
        }
      </div>
    );
  }
  