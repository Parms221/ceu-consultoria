"use client"
import PendingDot from "@/components/ui/pending-dot";
import useProyecto from "@/hooks/Proyecto/useProyecto";
import {useState, useEffect} from 'react'
import {
  Inbox,
  CircleCheckIcon,
  LucideIcon,
  SquareUserIcon,
  StarIcon
} from "lucide-react";
import Link from "next/link";

function getEstadisticas<EstadisticasProyecto>() {
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

export function SatisfaccionProyectos() {
  const { obtenerPorcentajeSatisfaccionGlobal } = useProyecto();
  const [data, setData] = useState<number>(0); // Estado inicializado en 0
  const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await obtenerPorcentajeSatisfaccionGlobal(); // Obtener datos asincrónicamente
        if (result !== undefined && result !== null) {
          setData(result); // Actualizar estado con el valor obtenido
        } else {
          setData(0); // Establecer 0 si el resultado es undefined o null
        }
      } catch (error) {
        console.error('Error al obtener el porcentaje de satisfacción:', error);
        setData(0); // Establecer 0 en caso de error
        setError('Ocurrió un error al obtener el porcentaje de satisfacción');
      } finally {
        setLoading(false); // Marcar como cargado
      }
    }

    fetchData();
  }, [obtenerPorcentajeSatisfaccionGlobal]);

  const formattedData = `${data}%`;

  return (
    <DefaultMiniCard
      title="Satisfacción de proyectos"
      TitleIcons={StarIcon}
      description={`Nivel de satisfaccion en los proyectos actuales`}
      main={formattedData} // Convertir a string si es necesario
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
