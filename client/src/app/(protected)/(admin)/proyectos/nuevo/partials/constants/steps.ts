export interface IStep {
  order: number;
  name: string;
  cardTitle: string;
  // Agrega un nuevo campo para las clases de estilos
  cardTitleClasses?: string;
}

export const STEPS_VALUES: IStep[] = [
  {
    order: 0,
    name: "Diagnóstico",
    cardTitle: "Información del cliente",
    cardTitleClasses: "text-2xl font-bold text-primary",
  },
  {
    order: 1,
    name: "Alcance",
    cardTitle: "Definición del alcance del proyecto",
    cardTitleClasses: "text-2xl font-bold text-primary",
  },
  //   Ya no, le dió pereza a Montañez
  // { order: 2, name: "Cronograma", cardTitle: "Cronograma", cardTitleClasses: "text-2xl font-bold text-primary" },
  {
    order: 2,
    name: "Asignación",
    cardTitle: "Añadir personas a este proyecto",
    cardTitleClasses: "text-2xl font-bold text-primary",
  },
];
