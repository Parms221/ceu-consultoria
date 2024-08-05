import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn, trimText } from "@/lib/utils";
import { Proyecto } from "@/types/proyecto";
import { formatDistance } from "date-fns";
import React from "react";
import { es } from "date-fns/locale/es";

type Props = {
  proyecto: Proyecto;
  active?: boolean;
  onClick?: () => void;
};
const ProyectoPendienteCard = ({ proyecto, onClick, active = false }: Props) => {
  return (
      <Card
        className={
          cn(
            "rounded-md cursor-pointer",
            active && "rounded-md border-ceu-celeste bg-white dark:border-white"
          )
        }
        onClick={onClick}
      >
        <CardHeader className="flex flex-row justify-between">
          <span className="text-title-md font-semibold text-black dark:text-white">
            {proyecto.titulo}
          </span>
          {formatDistance(proyecto.createdAt!, new Date(), { locale: es })}
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-black dark:text-white">
            {trimText(proyecto.descripcion, 100)}
          </p>
        </CardContent>
      </Card>
  );
};

export default ProyectoPendienteCard;
