import PendingDot from "@/components/ui/pending-dot";
import { cn } from "@/lib/utils";
import {
  Inbox,
  CircleCheckIcon,
  FolderOpenDotIcon,
  LucideIcon,
  SquareUserIcon,
} from "lucide-react";
import Link from "next/link";
import { HTMLAttributes } from "react";

function GetProyectoTerminados() {
  return {
    total: 24,
    time: 6 * 30,
  };
}

export function ProyectosTerminados() {
  const data = GetProyectoTerminados();
  return (
    <DefaultMiniCard
      title="Proyectos terminados"
      TitleIcons={CircleCheckIcon}
      description={`En los últimos ${data.time / 30} meses`}
      main={String(data.total)}
    />
  );
}

function GetConsultoresAsignados() {
  return {
    curr: 3,
    max: 5,
  };
}
export function ConsultoresAsignados() {
  const data = GetConsultoresAsignados();
  return (
    <DefaultMiniCard
      title="Consultores asignados"
      TitleIcons={SquareUserIcon}
      description={`Consultores asignados en algún proyecto`}
      main={`${data.curr} / ${data.max}`}
    />
  );
}

function GetProyectosPorConfirmar() {
  return {
    total: 1,
  };
}
export function ProyectosPorConfirmar() {
  const data = GetProyectosPorConfirmar();
  return (
    <Link href={"/proyectos/pendientes"}
      className="hover:scale-[1.02] transition-transform duration-200 ease-in-out transform" 
    >
      <MiniCard>
        <MiniCardTitle className="flex justify-between"
          Icon={Inbox}
          title="Proyectos por confirmar"
        >
          {
            data.total > 0 && (
              // Punto rojo pulsante
              <PendingDot/>
            )
          }
        </MiniCardTitle>
        <MiniCardValue>{data.total}</MiniCardValue>
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
      <MiniCardTitle Icon={props.TitleIcons} title={props.title}/>
      <MiniCardValue>{props.main}</MiniCardValue>
      <MiniCardDescription>{props.description}</MiniCardDescription>
    </div>
  );
}

interface MiniCardProps {
  children: React.ReactNode;
}
export function MiniCard(props : MiniCardProps){
  return (
    <div className="space-y-2 border border-bodydark2 bg-white px-5 py-3 dark:bg-boxdark">
      {props.children}
    </div>
  )
}

interface TitleProps  {
  title : string;
  children?: React.ReactNode;
  Icon?: LucideIcon;
  className?: string;
}
export function MiniCardTitle(props : TitleProps){
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
  )
}

export function MiniCardValue (props: {children: React.ReactNode}){
  return (
    <p className="text-2xl font-bold text-black dark:text-white">
      {props.children}
    </p>
  )
}

export function MiniCardDescription (props: {children: React.ReactNode}){
  return (
    <p className="text-sm text-bodydark">
      {props.children}
    </p>
  )
}