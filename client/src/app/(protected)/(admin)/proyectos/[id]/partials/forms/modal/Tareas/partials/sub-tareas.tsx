"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProjectDetail } from "../../../../contexto/proyecto-detail.context";
import { Checkbox } from "@/components/ui/checkbox";


export default function SubTareasChecklist() {
    const { 
      removeSubtarea,

      subtareasFields, 
      tareaForm : form 
    } = useProjectDetail();
   
    return (
      <div className={"space-y-3"}>
        <div className={"flex items-center gap-2"}>
          <h3 className="text-sm font-bold text-black">Lista de subtareas</h3>
        </div>
        <ul className={"space-y-2"}>
          {subtareasFields.length === 0 && (
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                No hay subtareas por realizar
              </p>
            </div>
          )} 
          {subtareasFields.map((obj, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                 <FormField 
                    control={form.control}
                    name={`subtareas.${index}.completado`}
                    render = {({field}) => (
                        <FormItem>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Checkbox
                                        name="completado"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name={`subtareas.${index}.descripcion`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className={"flex gap-2"}>
                        <FormControl>
                          <Input
                            {...field}
                            className={"flex-1"}
                          />
                        </FormControl>
                        
                          <Button
                            size={"sm"}
                            onClick={() => removeSubtarea(index)}
                            variant={"destructive"}
                          >
                            <span className={"sr-only"}>Eliminar Subtarea</span>
                            <TrashIcon className={"max-h-4 max-w-4"} />
                          </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
  