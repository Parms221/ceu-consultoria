"use client"

import { tareaSchema } from "@/app/(protected)/(admin)/proyectos/[id]/partials/forms/schemas";
import { TAREA_ESTADOS } from "@/constants/proyectos/estados";
import { TareaDTO } from "@/types/proyecto/Tarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useEffect, useState } from "react";
import { FieldArrayWithId, useFieldArray, UseFieldArrayAppend, UseFieldArrayRemove, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface ITareaFormContext {
    selectedTask: TareaDTO | null;
    setSelectedTask: (task: TareaDTO | null) => void;
    tareaForm: UseFormReturn<z.infer<typeof tareaSchema>, any, undefined>;

    subtareasFields: FieldArrayWithId<TareaDTO, "subtareas", "id">[];
  appendSubtarea: UseFieldArrayAppend<TareaDTO, "subtareas">;
  removeSubtarea: UseFieldArrayRemove;

  tareasDefaultValues : TareaDTO
}

export const TareaFormContext = createContext<ITareaFormContext>(
    {} as ITareaFormContext
)

export default function TareaFormProvider(
    { children }: { children: React.ReactNode; }
){
  const [selectedTask, setSelectedTask] = useState<TareaDTO | null>(null);

  const tareasDefaultValues = {
    titulo: "Nueva tarea",
    fechaFin: new Date(),
    fechaInicio: new Date(),
    descripcion: "",
    estado: TAREA_ESTADOS.por_hacer,
    participantesAsignados: undefined,
    subtareas: [],
  };

  const tareaForm = useForm<z.infer<typeof tareaSchema>>({
    resolver: zodResolver(tareaSchema),
    defaultValues: tareasDefaultValues,
  });

  const {
    fields: subtareasFields,
    append: appendSubtarea,
    remove: removeSubtarea,
  } = useFieldArray({
    control: tareaForm.control,
    name: "subtareas",
    rules: {
      required: true,
      minLength: 1,
    },
  });

  useEffect(() => {
    if (!selectedTask) return;
    tareaForm.reset({
      ...selectedTask,
    });
  }, [selectedTask]);

  return (
    <TareaFormContext.Provider
        value={{
            selectedTask,
            setSelectedTask,
            tareaForm,

            subtareasFields,
            appendSubtarea,
            removeSubtarea,
            tareasDefaultValues
        }}
    >
        {children}
    </TareaFormContext.Provider>
  )
}

export function useTareaForm(){
  const context = useContext(TareaFormContext);
  if (context === undefined) {
    throw new Error("useTareaForm must be used within a TareaFormProvider");
  }
  return context;
}