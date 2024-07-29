"use client";
import { projectCompleteSchema } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/schemas/project.schema";
import ConsultorMiniDetails from "@/components/common/Consultor/mini-details";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import useConsultor from "@/hooks/Consultor/useConsultor";
import { Participante } from "@/types/proyecto/Participante";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { PlusCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useProjectDetail } from "../../../contexto/proyecto-detail.context";

interface IParticipantesProps {
  form: UseFormReturn<z.infer<typeof projectCompleteSchema>, any, undefined>;
  participantes: Participante[];
}

export default function Participantes({
  form,
  participantes,
}: IParticipantesProps) {
  return (
    <div>
      <h2>Roles y participantes</h2>
      <div className="flex flex-wrap gap-2">
        <BoxParticipante />
        {participantes.map((participante) => {
          return (
            <BoxParticipante
              key={participante.idParticipante}
              participante={participante}
            />
          );
        })}
      </div>
    </div>
  );
}

export function BoxParticipante({
  participante,
}: {
  participante?: Participante;
}) {
  const { getConsultoresQuery } = useConsultor();
  const { data: consultores } = getConsultoresQuery();
  const { projectDetailForm } = useProjectDetail();
 
  const currentParticipantes =  projectDetailForm.watch("participantes");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="flex w-46 items-center gap-x-2 py-6 px-0"
        >
          {!participante ? (
            <>
              {" "}
              <PlusCircle className="h-6 w-6" />
              <span>Añadir miembro</span>
            </>
          ) : (
            participante && (
              <ConsultorMiniDetails
                consultor={participante.consultorParticipante}
              />
            )
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="z-99999 w-46 border border-neutral-300 bg-white py-1.5 px-1 shadow-xl"
        align="start"
      >
        <div>
          {!participante ? (
            <div>
              Combobox consultores a elegir
              <ul>
                {consultores?.filter(
                  (consultor) =>
                    !currentParticipantes?.find(
                      (p) => p.idConsultor === consultor.idConsultor,
                    ),
                ).map((consultor) => (
                  <li key={consultor.idConsultor}>
                    <Button
                      variant="ghost"
                      onClick={() => console.log(consultor)}
                    >
                      {consultor.nombres} {consultor.apellidos}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Button variant="destructive" className="w-full" size={"sm"}>Eliminar</Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
