import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Proyecto } from "@/types/proyecto";
import Image from "next/image";
import { ListChecks, Kanban, GanttChart, InfoIcon } from "lucide-react";
import { VistaResumen, VistaGantt, VistaKanban, VistaLista } from "./vistas";
import { Consultor } from "@/types/consultor";
import { Participante } from "@/types/proyecto/Participante";

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

export async function getProyectoById(id: number) {
  const mockConsultorParticipante: Participante = {
    idParticipante: 1,
    consultorParticipante: {
      apellidos: "Apellido consultor",
      cargo: "Cargo consultor",
      genero: "Masculino",
      idConsultor: 1,
      nombres: "Nombre consultor",
      usuarioConsultor: {
        id: 1,
        email: "Email consultor",
        name: "Nombre consultor",
        enabled: true,
        roles: [{ idRol: 1, rol: "ROLE_CONSULTOR" }],
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      },
    },
    createdAt: new Date().toDateString(),
  };
  const mockProuyecto: Proyecto = {
    idProyecto: 1,
    estado: { idEstado: 1, tipo: 0, descripcion: "En proceso" },
    fechaInicio: new Date().toDateString(),
    fechaLimite: new Date().toDateString(),
    objetivos: "objetivo1, objetivo2, objetivo3",
    precio: 150,
    titulo: "Proyecto de prueba 1",
    descripcion: "Proyecto descripción 1",
    servicio: {
      idServicio: 1,
      descripcion: "Servicio 1",
      entregablesDelServicio: [{ titulo: "Entregable 1" }],
      titulo: "Título de proyecto",
    },
    cliente: {
      idCliente: 2,
      nombre: "Cliente 1",
      apellido: "Apellido 1 y Apellido 2",
      dni: "12345678",
      email: "Email@gmail.com",
      telefono: "123456789",
      tipo_documento: "DNI",
      usuarioCliente: null,
    },
    requerimientos: "requerimiento1, requerimiento2, requerimiento3",
    participantes: [mockConsultorParticipante],
    hito: [
      {
        idHito: 1,
        titulo: "Hito 1",
        fechaFinalizacion: new Date().toDateString(),
        fechaInicio: new Date().toDateString(),
        tareasDelHito: [
          {
            idTarea: 1,
            descripcion: "Tarea 1 descripción",
            estado: {
              idEstado: 1,
              descripcion: "En progreso",
              tipo: 0,
            },
            fechaFin: new Date().toDateString(),
            fechaInicio: new Date().toDateString(),
            titulo: "Tarea 1",
            participantesAsignados: [mockConsultorParticipante],
          },
        ],
      },
    ],
  };
  return mockProuyecto;
}

export default async function ProjectDetail({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const proyecto = await getProyectoById(id);

  return (
    <section className="mx-auto space-y-1.5">
      <header className="flex">
        <div className="flex items-center gap-2">
          <Image
            className="h-[50px] w-[50px] rounded-md"
            src={"/images/cover/cover-01.png"}
            alt="Project illustration"
            width={50}
            height={50}
          />
          <h1 className="text-2xl font-bold tracking-tighter">
            {proyecto.titulo}
          </h1>
        </div>
      </header>
      {/* Tabs de navegación */}
      <Tabs defaultValue={PROJECT_VIEWS[0].id} className="space-y-1.5 p-0">
        <TabsList>
          {PROJECT_VIEWS.map((view) => {
            return (
              <TabsTrigger
                key={view.id}
                value={view.id}
                className="flex items-center gap-2"
              >
                {view.icon}
                <span>{view.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="area p-8">
          {PROJECT_VIEWS.map((view) => {
            const View = view.content;
            return (
              <TabsContent key={view.id} value={view.id}>
                <View hitos={proyecto.hito ? proyecto.hito : []} />
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </section>
  );
}
