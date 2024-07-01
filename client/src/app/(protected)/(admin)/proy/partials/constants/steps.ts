import ProjectFormPage1 from "@/app/(protected)/(admin)/proy/partials/pages/page1";

export interface IStep {
  order: number;
  name: string;
  cardTitle: string;
}

export const STEPS_VALUES: IStep[] = [
  { order: 0, name: "Diagnóstico", cardTitle: "Información del cliente" },
  {
    order: 1,
    name: "Alcance",
    cardTitle: "Definición del alcance del proyecto",
  },
  { order: 2, name: "Cronograma", cardTitle: "Cronograma" },
  {
    order: 3,
    name: "Asignación",
    cardTitle: "Añadir personas a este proyecto",
  },
];
