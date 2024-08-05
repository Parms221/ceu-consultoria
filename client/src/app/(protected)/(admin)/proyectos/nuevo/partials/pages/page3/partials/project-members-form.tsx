"use client";
import { Consultor } from "@/types/consultor";
import MemberCard from "./member-card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useProjectForm } from "../../../multi-step-form/context";
import { useQuery } from "@tanstack/react-query";
import { getConsultores } from "@/actions/Consultor";

export default function ProjectMembersForm() {
  const {
    isPending,
    isError,
    data: consultores,
    error,
  } = useQuery({
    queryKey: ["consultores"],
    queryFn: async () => await getConsultores(),
  });

  const { form } = useProjectForm();

  const [filtroConsultores, setFiltroConsultores] = useState<Consultor[]>([]);

  useEffect(() => {
    if (consultores) {
      setFiltroConsultores(consultores.filter((c) => !isAsigned(c)));
    }
  }, [consultores]);

  // Verifica si un consultor está asignado al proyecto que se está creando
  function isAsigned(consultor: Consultor) {
    const asigned = form.getValues().participantes;
    if (asigned) {
      return asigned.find(
        (consultant) => consultant.idConsultor == consultor.idConsultor,
      );
    }
    return false;
  }

  // Actualiza la lista de consultores disponibles cada vez que se añade un consultor al proyecto
  form.watch((value, { name }) => {
    if (name == "participantes") {
      const nonAsignedConsultants =
        consultores?.filter((c) => !isAsigned(c)) ?? [];
      setFiltroConsultores(nonAsignedConsultants);
    }
  });

  // Función para buscar consultores por nombre completo
  function searchConsultant(event: React.ChangeEvent<HTMLInputElement>) {
    const search = event.target.value;
    const filtered = consultores?.filter((consultor) => {
      const name = consultor.nombres + " " + consultor.apellidos;
      return (
        name.toLowerCase().includes(search.toLowerCase()) &&
        !isAsigned(consultor)
      );
    });
    if (!filtered) return;
    setFiltroConsultores(filtered);
  }

  if (isPending) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return (
      <div>
        Error al cargar los consultores
        {error.message}
      </div>
    );
  }

  if (!consultores) {
    return <div>No hay consultores disponibles</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Consultores disponibles</h2>
        <div className="flex items-center gap-2">
          <Input
            onChange={searchConsultant}
            placeholder="Buscar consultor"
            className="bg-muted"
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "8px",
        }}
      >
        {filtroConsultores.length > 0 ? (
          filtroConsultores.map((consultor) => {
            return (
              <MemberCard key={consultor.idConsultor} member={consultor} />
            );
          })
        ) : (
          <div className="grid h-32 place-content-center text-center text-muted-foreground">
            No se encontraron consultores disponibles
          </div>
        )}
      </div>
    </div>
  );
}
