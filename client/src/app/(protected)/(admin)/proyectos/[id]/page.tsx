import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Proyecto } from "@/types/proyecto";
import Image from "next/image";
import { ListChecks, Kanban, GanttChart, InfoIcon } from 'lucide-react'
import { VistaResumen, VistaGantt, VistaKanban, VistaLista } from "./partials/vistas";

 
export const PROJECT_VIEWS = [
    {
        id: "resumen",
        label: "Resumen",
        icon: <InfoIcon />,
        content: <VistaResumen />
    },
    {
        id: "lista",
        label: "Lista",
        icon : <ListChecks />,
        content: <VistaLista />
    },
    {
        id: "kanban",
        label: "Tablero",
        icon: <Kanban />,
        content: <VistaKanban />
    },
    {
        id: "gantt",
        label: "Diagrama de Gantt",
        icon: <GanttChart />,
        content: <VistaGantt />
    }
]

export async function getProyectoById(id : number) {
    const mockProuyecto : Proyecto = {
        idProyecto: 1,
        estado: { idEstado: 1, tipo: 0, descripcion: "En proceso"},
        fechaInicio: (new Date()).toDateString(),
        fechaLimite: (new Date()).toDateString(),
        objetivos: "objetivo1, objetivo2, objetivo3",
        precio: 150,
        titulo: "Proyecto de prueba 1",
        descripcion: "Proyecto descripción 1",
        servicio: {
            idServicio: 1,
            descripcion: "Servicio 1",
            precio: 150,
            entregablesDelServicio: [{titulo: "Entregable 1"}],
            titulo: "Título de proyecto"
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
        participantes: [
            {
                idParticipante: 1,
                consultorParticipante: {
                    apellidos: "Apellido consultor",
                    cargo: "Cargo consultor",
                    genero: "Masculino",
                    idConsultor : 1,
                    nombres: "Nombre consultor",
                    usuarioConsultor: {
                        id: 1,
                        email: "Email consultor",
                        name: "Nombre consultor",
                        enabled: true,
                        roles: [{idRol: 1, rol: "ROLE_CONSULTOR"}],
                        createdAt: (new Date()).toDateString(),
                        updatedAt: (new Date()).toDateString(),
                    },

                },
                createdAt: (new Date()).toDateString(),
            }
        ]
    }
    return mockProuyecto;
}

export default async function ProjectDetail({ params } : { params: { id: number } }) {
  const {id} = params
  const proyecto = await getProyectoById(id)

    return (
      <section className="mx-auto space-y-1.5">
        <header className="flex">
            <div className="flex items-center gap-2">
                <Image 
                    className="rounded-md w-[50px] h-[50px]"
                    src={"/images/cover/cover-01.png"}
                    alt="Project illustration"
                     width={50}
                     height={50}
                />
                <h1 className="font-bold text-2xl tracking-tighter">{proyecto.titulo}</h1>
            </div>
        </header>
        {/* Tabs de navegación */}
        <Tabs defaultValue={PROJECT_VIEWS[0].id} className="p-0 space-y-1.5">
            <TabsList>
                {
                    PROJECT_VIEWS.map((view) => {
                        return (
                            <TabsTrigger key={view.id} value={view.id} className="flex items-center gap-2">
                                {view.icon}   
                                <span>
                                    {view.label}
                                </span>
                            </TabsTrigger>
                        )
                    })
                }
            </TabsList>
            <div className="area p-8">
                {
                    PROJECT_VIEWS.map((view) => {
                        return (
                            <TabsContent key={view.id} value={view.id}>
                                {view.content}
                            </TabsContent> 
                        )
                    })
                }
            </div>
        </Tabs>

      </section>
    );
}