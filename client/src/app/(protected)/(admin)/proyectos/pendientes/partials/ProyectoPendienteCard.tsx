import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn, trimText } from "@/lib/utils";
import { Proyecto } from "@/types/proyecto";
import Link from "next/link";
import React from "react";
type Props = {
  proyecto: Proyecto;
  active?: boolean;
};
const ProyectoPendienteCard = ({ proyecto, active = false }: Props) => {
  return (
    <Link
      key={proyecto.idProyecto}
      href={`/proyectos/pendientes/${proyecto.idProyecto}`}
    >
      <Card
        className={
          active
            ? cn("rounded-md border-ceu-celeste bg-white dark:border-white")
            : "rounded-md"
        }
      >
        <CardHeader className="flex flex-row justify-between">
          <span className="text-title-md font-semibold text-black dark:text-white">
            {proyecto.titulo}
          </span>
          <relative-time
            datetime={new Date(proyecto.createdAt!).toISOString()}
            lang="es"
          ></relative-time>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-black dark:text-white">
            {trimText(proyecto.descripcion, 100)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProyectoPendienteCard;
