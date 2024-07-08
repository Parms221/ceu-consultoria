"use client"
import { Consultor } from "@/types/consultor";
import MemberCard from "./member-card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useProjectForm } from "../../../multi-step-form/context";

const mockConsultants = () => {
    const mock : Consultor [] = [
        {
            idConsultor: 1,
            nombres: "Juan",
            apellidos: "Perez",
            cargo: "Desarrollador",
            genero: "Masculino",
            createdAt: "2021-09-01T00:00:00",
            updatedAt: "2021-09-01T00:00:00",
            usuarioConsultor: {
                id: 1,
                email: "email@exmaple.org",
                createdAt: "2021-09-01T00:00:00",
                enabled: true,
                name: "JuanPerez",
                roles: [
                    {idRol: 1, rol: "ROLE_CONSULTOR"}
                ],
                updatedAt: "2021-09-01T00:00:00",
            }
        },
        {
            idConsultor: 2,
            nombres: "Maria",
            apellidos: "Gomez",
            cargo: "Desarrollador",
            genero: "Femenino",
            createdAt: "2021-09-01T00:00:00",
            updatedAt: "2021-09-01T00:00:00",
            usuarioConsultor: {
                id: 2,
                email: "margomez@gmail.com",
                createdAt: "2021-09-01T00:00:00",
                enabled: true,
                name: "MariaGomez",
                roles: [
                    {idRol: 1, rol: "ROLE_CONSULTOR"}
                ],
                updatedAt: "2021-09-01T00:00:00",
            }
        }
    ]
    return mock
}

export default function ProjectMembersForm() {
    const consultores = mockConsultants();
    const { form } = useProjectForm();
    const [filtroConsultores, setFiltroConsultores] = useState<Consultor[]>(consultores);

    // Verifica si un consultor está asignado al proyecto que se está creando
    function isAsigned(consultor: Consultor){
        const asigned = form.getValues().participantes;
        if (asigned){
            return asigned.find((consultant) => consultant.idConsultor == consultor.idConsultor);
        }
        return false;
    }

    // Actualiza la lista de consultores disponibles cada vez que se añade un consultor al proyecto
    form.watch((value, { name }) => {
        if (name == "participantes") {
          const nonAsigedConsultants = consultores.filter((c) => !isAsigned(c)) 
          setFiltroConsultores(nonAsigedConsultants);
        }
      });

    // Función para buscar consultores por nombre completo
    function searchConsultant(event: React.ChangeEvent<HTMLInputElement>) {
        const search = event.target.value;
        const filtered = consultores.filter((consultor) => {
          const name = consultor.nombres + " " + consultor.apellidos;
          return name.toLowerCase().includes(search.toLowerCase()) && !isAsigned(consultor);
        });
        setFiltroConsultores(filtered);
      }

    return (
        <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Consultores disponibles</h2>
              <div className="flex items-center gap-2">
                <Input 
                    onChange={searchConsultant}
                    placeholder="Buscar consultor" className="bg-muted" 
                />
              </div>
            </div>
            <div style={
                {
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "8px"
                }
            }>
                {
                    filtroConsultores.length > 0 ? filtroConsultores.map((consultor) => {
                        return (
                            <MemberCard key={consultor.idConsultor} member={consultor} />
                        )
                    }) : (
                        <div className="text-muted-foreground text-center h-32 grid place-content-center">
                            No se encontraron consultores disponibles
                        </div>
                    )
                }
            </div>
        </div>
    );
}  