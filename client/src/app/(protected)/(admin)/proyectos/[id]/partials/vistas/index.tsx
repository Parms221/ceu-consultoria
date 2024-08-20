import VistaGantt from "./gantt";
import VistaResumen from "./resumen/resumen";
import VistaLista from "./lista/lista";
import VistaKanban from "./kanban";
import { GanttChart, InfoIcon, Kanban, ListChecks, FolderOpen, Video, Calendar } from "lucide-react";
import VistaEspacio from "./espacio_trabajo/espacio";
import Reuniones from "./reuniones";
import VistaCalendario from "./calendario/calendario";


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
      id: "calendario",
      label: "Calendario",
      icon: <Calendar />,
      content: VistaCalendario,
    },
    {
      id: "reuniones",
      label: "Reuniones",
      icon: <Video />,
      content: Reuniones,
    },
    {
      id: "espacio",
      label: "Espacio de trabajo",
      icon: <FolderOpen/>,
      content: VistaEspacio,
    }
  ];

export {
    VistaGantt,
    VistaResumen,
    VistaLista,
    VistaKanban
}