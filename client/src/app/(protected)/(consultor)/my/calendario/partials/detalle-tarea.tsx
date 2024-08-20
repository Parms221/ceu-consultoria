"use client";
import ItemDetail from "@/components/common/EventsCalendar/partials/item-detail";
import useTarea from "@/hooks/Tarea/useTarea";
import { formatDateRange } from "@/lib/date-format";
import { Tarea } from "@/types/proyecto/Tarea";
import {
  CheckCircle,
  Loader,
  TextIcon,
  Users2,
} from "lucide-react";

export default function CalendarDetalleTarea({ tarea }: { tarea: Tarea }) {
  const { getBadgeByStatus } = useTarea();
  return (
    <div className="flex flex-col gap-2 overflow-hidden p-4">
      <header className="space-y-1">
        <h1 className="leading-no whitespace-break-spaces font-medium tracking-tight text-ceu-celeste dark:text-white">
          {tarea.titulo}
        </h1>
        <p className="text-xs leading-none text-neutral-600">
          {formatDateRange(tarea.fechaInicio, tarea.fechaFin)}
        </p>
      </header>
      <ItemDetail
        icon={<Loader size={15} />}
        title="Estado"
        value={getBadgeByStatus(tarea.estado)}
      />
      <div className="flex flex-col gap-1">
        {tarea.participantesAsignados.length > 0 && (
          <ItemDetail
            icon={<Users2 size={15} />}
            title={`${tarea.participantesAsignados.length} asignado(s)`}
          />
        )}
        <ul className="ml-6 text-xs font-semibold text-ceu-azul">
          {tarea.participantesAsignados.map((p) => (
            <li
              key={p.idParticipante}
            >{`${p.consultorParticipante.nombres} ${p.consultorParticipante.apellidos}`}</li>
          ))}
        </ul>
      </div>
      {tarea.descripcion && (
        <ItemDetail
          icon={<TextIcon size={20} />}
          title="Descripción"
          value={tarea.descripcion}
        />
      )}
      <div className="flex flex-col gap-1">
        {tarea.subTareas.length > 0 && (
          <ItemDetail
            icon={<CheckCircle size={15}/>}
            title={`Checklist`}
          />
        )}
        <ul className="ml-6 text-xs font-semibold text-ceu-azul list-disc">
          {tarea.subTareas.map((st) => (
            <li key={st.idSubTarea}
              className={`${st.completado && "line-through"}`}
            >{st.descripcion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
