import VistaGantt from "./gantt";
import VistaResumen from "./resumen/resumen";
import VistaLista from "./lista/lista";
import VistaKanban from "./kanban";
import VistaFeedback from "./feedback/feedback-client";
import { GanttChart, InfoIcon, Kanban, ListChecks, FolderOpen } from "lucide-react";
import VistaEspacio from "./espacio_trabajo/espacio";


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
    {
      id: "espacio",
      label: "Espacio de trabajo",
      icon: <FolderOpen/>,
      content: VistaEspacio,
    },
    {
      id: "feedback",
      label: "Feedback",
      icon: <InfoIcon/>,
      content: VistaFeedback,
    }
  ];

export {
    VistaGantt,
    VistaResumen,
    VistaLista,
    VistaKanban,
    VistaFeedback
}