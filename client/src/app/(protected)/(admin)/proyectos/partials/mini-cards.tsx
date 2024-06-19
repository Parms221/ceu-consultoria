import {
  CheckIcon,
  CircleCheckIcon,
  FolderOpenDotIcon,
  LucideIcon,
  SquareUserIcon,
} from "lucide-react";

function GetProyectoTerminados() {
  return {
    total: 24,
    time: 6 * 30,
  };
}

export function ProyectosTerminados() {
  const data = GetProyectoTerminados();
  return (
    <DefaultMiniCart
      title="Proyectos Terminados"
      TitleIcons={CircleCheckIcon}
      description={`En los últimos ${data.time / 30} meses`}
      main={data.total}
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
    <DefaultMiniCart
      title="Consultores Asignados"
      TitleIcons={SquareUserIcon}
      description={`Consultores asignados según grupo`}
      main={`${data.curr} / ${data.max}`}
    />
  );
}

function GetProyectosPorConfirmar() {
  return {
    total: 1,
  };
}
export function ProyectorPorConfirmar() {
  const data = GetProyectosPorConfirmar();
  return (
    <DefaultMiniCart
      title="Proyector por confirmar"
      TitleIcons={FolderOpenDotIcon}
      description={`Proyectos pendientes por confirmación`}
      main={`${data.total}`}
    />
  );
}

interface DefaultMIniCartProps {
  title: string;
  TitleIcons: LucideIcon;
  description: string;
  main: string;
}

export function DefaultMiniCart(props: DefaultMIniCartProps) {
  return (
    <div className="space-y-2 border border-bodydark2 bg-white px-5 py-3 dark:bg-boxdark">
      <h3 className="flex items-center gap-1">
        <props.TitleIcons className={"h-5 w-5 text-primary"} />
        <span className="font-semibold text-black dark:text-white">
          {props.title}
        </span>
      </h3>
      <p className="text-2xl font-bold text-black dark:text-white">
        {props.main}
      </p>
      <p className="text-sm text-bodydark">{props.description}</p>
    </div>
  );
}
