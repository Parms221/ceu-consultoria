import { MultiSelect } from "@/components/Multiselect/Multiselect";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import React from "react";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";
import useParticipante from "@/hooks/Partcipante/useParticipante";

const SelectParticipantesTarea = () => {
  const { getParticipantesDeProyectoQuery } = useParticipante();
  const { projectId, tareaForm: form } = useProjectDetail();

  const res = getParticipantesDeProyectoQuery(projectId);
  return (
    <FormField
      control={form.control}
      name="participantesAsignados"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Participantes</FormLabel>
          <MultiSelect
            onValueChange={(value) => {
              field.onChange(value);
            }}
            options={
              res.data?.map((p) => ({
                label:
                  p.consultorParticipante.nombres +
                  " " +
                  p.consultorParticipante.apellidos,
                value: p.idParticipante.toString(),
              })) || []
            }
            placeholder="Selecciona los participantes"
            defaultValue={field.value?.map((e) => e?.toString()) || []}
          ></MultiSelect>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectParticipantesTarea;
