import { getProyectoById, getProyectosPropuestos } from "@/actions/Proyecto";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import "@github/relative-time-element";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProyectoPendienteCard from "../partials/ProyectoPendienteCard";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX } from "lucide-react";
import { format } from "date-fns";

export default async function ProyectosPendientes({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const data = await getProyectosPropuestos();
  const proyecto = await getProyectoById(id);

  return (
    <section>
      <Breadcrumb pageName={"Proyectos por confirmar"} slug={proyecto?.titulo}>
        <Link href="/proyectos">Proyectos /</Link>
        <Link href="/proyectos"> Pendientes /</Link>
      </Breadcrumb>

      <article className="area">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="hidden md:block"
            minSize={30}
            defaultSize={40}
            maxSize={50}
          >
            <div className="grid grid-cols-1 gap-5 px-5">
              {data?.map((proyecto) => (
                <ProyectoPendienteCard
                  key={proyecto.idProyecto}
                  proyecto={proyecto}
                />
              ))}
            </div>
          </ResizablePanel>
          <ResizableHandle className="hidden md:block" />
          <ResizablePanel>
            {proyecto ? (
              <section className="flex flex-col gap-3 p-3">
                <h2 className="text-xl font-bold text-ceu-celeste">
                  Detalles del {proyecto.titulo}
                </h2>
                <div>
                  <h3 className="font-medium text-black">
                    Consultores asignados
                  </h3>
                  <ul className="mt-1">
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
                              <p>{consultor.consultorParticipante.nombres}</p>
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
                    <h3 className="font-medium text-black">Fecha de inicio</h3>
                    <p>
                      {
                        // format date using date-fns example: 01 de Enero de 2021
                        format(
                          new Date(proyecto.fechaInicio),
                          "dd 'de' MMMM 'de' yyyy",
                        )
                      }
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-black">Fecha Límite</h3>
                    <p>
                      {
                        // format date using date-fns example: 01 de Enero de 2021
                        format(
                          new Date(proyecto.fechaLimite),
                          "dd 'de' MMMM 'de' yyyy",
                        )
                      }
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-black">
                    Descripción del proyecto
                  </h3>
                  <p>{proyecto.descripcion}</p>
                </div>
                <div>
                  <h3 className="font-medium text-black">Objetivos</h3>
                  <ul className="ml-5 list-disc">
                    {proyecto.objetivos
                      ?.split("\n")
                      .map((objetivo) => <li key={objetivo}>{objetivo}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-black">Entregables</h3>
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
                    className="flex items-center gap-2"
                    variant={"default"}
                  >
                    <span>Aceptar proyecto</span>

                    <CircleCheck size={20} />
                  </Button>
                  <Button
                    className="flex items-center gap-2"
                    variant={"destructive"}
                  >
                    <span>Rechazar proyecto</span>
                    <CircleX size={20} />
                  </Button>
                </div>
              </section>
            ) : (
              <div className="flex w-full items-center justify-center p-5">
                <p>No se ha seleccionado ningún proyecto</p>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </article>
    </section>
  );
}
