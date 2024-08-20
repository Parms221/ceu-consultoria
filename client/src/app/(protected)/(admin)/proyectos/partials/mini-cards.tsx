"use client"
import PendingDot from "@/components/ui/pending-dot";
import useProyecto from "@/hooks/Proyecto/useProyecto";
import {
  Inbox,
  CircleCheckIcon,
  LucideIcon,
  SquareUserIcon,
} from "lucide-react";
import Link from "next/link";

function getEstadisticas<EstadisticasProyecto>() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getEstadisticasQuery } = useProyecto()
  const { data } = getEstadisticasQuery()
  return data ? data : {
    terminados: 0,
    propuestos: 0,
    consultores: {
      current: 0,
      max: 0
    }
  };
}

export function ProyectosTerminados() {
  const data = getEstadisticas();
  return (
    <DefaultMiniCard
      title="Proyectos terminados"
      TitleIcons={CircleCheckIcon}
      description={`En los últimos ${6 / 30} meses`}
      main={String(data.terminados)}
    />
  );
}

export function ConsultoresAsignados() {
  const data = getEstadisticas();
  
  return (
    <DefaultMiniCard
      title="Consultores asignados"
      TitleIcons={SquareUserIcon}
      description={`Consultores asignados en algún proyecto`}
      main={`${data.consultores.current} / ${data.consultores.max}`}
    />
  );
}

export function ProyectosPorConfirmar() {
  const data = getEstadisticas();
  
  return (
    <Link
      href={"/proyectos/pendientes"}
      className="transform transition-transform duration-200 ease-in-out hover:scale-[1.02]"
    >
      <MiniCard>
        <MiniCardTitle
          className="flex justify-between"
          Icon={Inbox}
          title="Proyectos por confirmar"
        >
          {data && data.propuestos > 0 && (
            // Punto rojo pulsante
            <PendingDot />
          )}
        </MiniCardTitle>
        <MiniCardValue>{data?.propuestos}</MiniCardValue>
        <MiniCardDescription>
          Proyectos que están en espera de confirmación
        </MiniCardDescription>
      </MiniCard>
    </Link>
  );
}

interface DefaultMiniCardProps {
  title: string;
  TitleIcons: LucideIcon;
  description: string;
  main: string;
}

export function DefaultMiniCard(props: DefaultMiniCardProps) {
  return (
    <div className="space-y-2 border border-bodydark2 bg-white px-5 py-3 dark:bg-boxdark">
      <MiniCardTitle Icon={props.TitleIcons} title={props.title} />
      <MiniCardValue>{props.main}</MiniCardValue>
      <MiniCardDescription>{props.description}</MiniCardDescription>
    </div>
  );
}

interface MiniCardProps {
  children: React.ReactNode;
}
export function MiniCard(props: MiniCardProps) {
  return (
    <div className="space-y-2 border border-bodydark2 bg-white px-5 py-3 dark:bg-boxdark">
      {props.children}
    </div>
  );
}

interface TitleProps {
  title: string;
  children?: React.ReactNode;
  Icon?: LucideIcon;
  className?: string;
}
export function MiniCardTitle(props: TitleProps) {
  return (
    <header className={props.className}>
      <div className="flex items-center gap-1">
        {props.Icon && <props.Icon className={"h-5 w-5 text-primary"} />}
        <h3 className="font-semibold text-black dark:text-white">
          {props.title}
        </h3>
      </div>
      {props.children}
    </header>
  );
}

export function MiniCardValue(props: { children: React.ReactNode }) {
  return (
    <p className="text-2xl font-bold text-black dark:text-white">
      {props.children}
    </p>
  );
}

export function MiniCardDescription(props: { children: React.ReactNode }) {
  return <p className="text-sm text-bodydark">{props.children}</p>;
}
