"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Proyecto } from "@/types/proyecto";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";
import useProyecto from "@/hooks/Proyecto/useProyecto";
import { ESTADOS } from "@/constants/proyectos/estados";
import { useQueryClient } from "@tanstack/react-query";
import { es } from "date-fns/locale/es";

type Props = {
  proyecto: Proyecto;
};
const ProyectoDetails = ({ proyecto }: Props) => {
  const queryClient = useQueryClient();
  const { actualizarEstadoProyecto } = useProyecto();
  const [updating, setUpdating] = useState(false);

  const handleRechazarProyecto = async () => {
    setUpdating(true);
    await actualizarEstadoProyecto(proyecto.idProyecto, ESTADOS.rechazado);
    invalidatePropuestos();
    setUpdating(false);
  };

  const handleAceptarProyecto = async () => {
    setUpdating(true);
    const response = await actualizarEstadoProyecto(proyecto.idProyecto, ESTADOS.desarrollo)
    invalidatePropuestos();
    setUpdating(false);
  };

  function invalidatePropuestos(){
    queryClient.invalidateQueries({queryKey: ["proyectos","propuestos"]})
  }
  
  return (
    <section className="flex flex-col gap-3 p-3">
      <h2 className="text-xl font-bold text-ceu-celeste dark:text-ceu-gris">
        Detalles del {proyecto.titulo}
      </h2>
      <div>
        <h3 className="font-medium text-black dark:text-white">
          Consultores asignados
        </h3>
        <ul className="mt-1 flex gap-2">
          {proyecto.participantes?.map((consultor) => (
            <li key={consultor.idParticipante}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{consultor.consultorParticipante?.nombres}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
          {proyecto.participantes?.length === 0 && (
            <li>No hay consultores asignados</li>
          )}
        </ul>
      </div>
      <div className="flex gap-10">
        <div>
          <h3 className="font-medium text-black dark:text-white">
            Fecha de inicio
          </h3>
          <p>
            {
              // format date using date-fns example: 01 de Enero de 2021
              format(new Date(proyecto.fechaInicio), "dd 'de' MMMM 'de' yyyy")
            }
          </p>
        </div>
        <div>
          <h3 className="font-medium text-black dark:text-white">
            Fecha Límite
          </h3>
          <p>
            {
              // format date using date-fns example: 01 de Enero de 2021
              format(new Date(proyecto.fechaLimite), "dd 'de' MMMM 'de' yyyy")
            }
          </p>
        </div>
        <div>
          <h3 className="font-medium text-black dark:text-white">
            Duración total
          </h3>
          <p>
            {
              // format date using date-fns example: 01 de Enero de 2021
              formatDuration(
                intervalToDuration({
                  start: new Date(proyecto.fechaInicio),
                  end: new Date(proyecto.fechaLimite)
                }), {
                  locale : es,
                  format: ["months", "days", "hours"]
                }
              )
            }
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-black dark:text-white">Cotización total</h3>
        <p className="text-lg">
          S/{proyecto.precio}
        </p>
      </div>
      <div>
        <h3 className="font-medium text-black dark:text-white">
          Descripción del proyecto
        </h3>
        <p>{proyecto.descripcion}</p>
      </div>
      <div>
        <h3 className="font-medium text-black dark:text-white">Objetivos</h3>
        <ul className="ml-5 list-disc">
          {proyecto.objetivos
            ?.split("\n")
            .map((objetivo) => <li key={objetivo}>{objetivo}</li>)}
        </ul>
      </div>
      <div>
        <h3 className="font-medium text-black dark:text-white">Entregables</h3>
        <ul className="ml-5 list-disc">
          {proyecto.entregables?.map((entregable) => (
            <li key={entregable.idEntregableProyecto}>
              {entregable.entregableServicio.titulo}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-5">
        <Button
          disabled={updating}
          onClick={() => handleAceptarProyecto()}
          className="flex items-center gap-2"
          variant={"default"}
        >
          <span>Aceptar proyecto</span>

          <CircleCheck size={20} />
        </Button>
        <Button
          disabled={updating}
          onClick={() => handleRechazarProyecto()}
          className="flex items-center gap-2"
          variant={"destructive"}
        >
          <span>Rechazar proyecto</span>
          <CircleX size={20} />
        </Button>
      </div>
    </section>
  );
};

export default ProyectoDetails;
