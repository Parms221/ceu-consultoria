import VistaGantt from "./gantt";
import VistaResumen from "./resumen/resumen";
import VistaLista from "./lista/lista";
import VistaKanban from "./kanban";
import { GanttChart, InfoIcon, Kanban, ListChecks } from "lucide-react";


export const PROJECT_VIEWS = [
    {
      id: "resumen",
      label: "Resumen",
      icon: <InfoIcon />,
      content: VistaResumen,
    },
    {
      id: "lista",
      label: "Lista",
      icon: <ListChecks />,
      content: VistaLista,
    },
    {
      id: "kanban",
      label: "Tablero",
      icon: <Kanban />,
      content: VistaKanban,
    },
    {
      id: "gantt",
      label: "Diagrama de Gantt",
      icon: <GanttChart />,
      content: VistaGantt,
    },
  ];

export {
    VistaGantt,
    VistaResumen,
    VistaLista,
    VistaKanban
}