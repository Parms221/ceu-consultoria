"use client";

import { aprobarProyecto, rechazarProyecto } from "@/actions/Proyecto";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Proyecto } from "@/types/proyecto";
import { format } from "date-fns";
import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  proyecto: Proyecto;
};
const ProyectoDetails = ({ proyecto }: Props) => {
  const [aceptando, setAceptando] = useState(false);
  const [rechazando, setRechazando] = useState(false);
  const router = useRouter();

  const handleRechazarProyecto = async () => {
    setRechazando(true);
    const response = await rechazarProyecto(proyecto.idProyecto);
    if (response.status === "success") {
      toast.success("Proyecto rechazado");
      router.push("/proyectos/pendientes");
    }

    setRechazando(false);
  };

  const handleAceptarProyecto = async () => {
    setAceptando(true);
    const response = await aprobarProyecto(proyecto.idProyecto.toString());
    if (response.status === "success") {
      toast.success("Proyecto aceptado");
      router.push("/proyectos/pendientes");
    }
    setAceptando(false);
  };
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
          disabled={aceptando}
          onClick={() => handleAceptarProyecto()}
          className="flex items-center gap-2"
          variant={"default"}
        >
          <span>Aceptar proyecto</span>

          <CircleCheck size={20} />
        </Button>
        <Button
          disabled={rechazando}
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
