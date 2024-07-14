import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useProjectForm } from "../../../multi-step-form/context";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectOverview() {
  const { form } = useProjectForm();

  const watchConsultores = form.watch("participantes");
  const projectDetails = form.getValues().project!;
  const client = form.getValues().cliente;

  function removeConsultor(consultorId: number) {
    const consultores = form.getValues().participantes;
    const newConsultores = (consultores ?? []).filter(
      (consultor: any) => consultor.idConsultor !== consultorId,
    );
    form.setValue("participantes", newConsultores);
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      <Card className="col-span-2">
        <CardTitle>Detalles del proyecto</CardTitle>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <div>
              <h4 className="text-sm font-medium">{projectDetails.title}</h4>
              <p className="text-xs text-muted-foreground">
                Descripción: {projectDetails.description}
              </p>
              <p className="text-xs text-muted-foreground">Objetivos</p>
              <ul className="list-disc pl-4 text-xs text-muted-foreground">
                {projectDetails.objetivos.map((objetivo, index) => {
                  return <li key={index}>{objetivo}</li>;
                })}
              </ul>
              <p className="text-xs text-muted-foreground">
                {/*  Formato 15 de juno de 2024 */}
                Fecha de inicio:{" "}
                {format(new Date(projectDetails.fechaInicio), "PPP", {
                  locale: es,
                })}
              </p>
              <p className="text-xs text-muted-foreground">
                Fecha límite:{" "}
                {format(new Date(projectDetails.fechaLimite), "PPP", {
                  locale: es,
                })}
              </p>
            </div>
          </div>
          <div>
            <h3 className="mb-1 text-sm font-medium underline">Cliente</h3>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm font-medium">
                  {client?.razonSocial
                    ? client.razonSocial
                    : `${client?.nombre} ${client?.apellido}`}
                </p>
                <p className="text-xs text-muted-foreground">
                  Tipo :{" "}
                  {client?.tipo_documento === "DNI" ? "Natural" : "Jurídico"}
                </p>
                <p className="text-xs text-muted-foreground">Phone: 555-1234</p>
                <p className="text-xs text-muted-foreground">
                  Email: {client?.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  Teléfono: {client?.telefono}
                </p>
                <p className="text-xs text-muted-foreground">
                  {client?.tipo_documento === "DNI"
                    ? `DNI: ${client?.dni}`
                    : `RUC: ${client?.ruc}`}
                </p>
                <p className="flex text-xs text-muted-foreground">
                  Documentos: <File size={14} /> <span>Contrato.pdf</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="max-h-[325px] overflow-hidden overflow-y-auto">
        <CardTitle>Consultores asignados</CardTitle>
        <CardContent>
          <ul className="flex flex-col gap-2">
            {watchConsultores && watchConsultores.length > 0 ? (
              watchConsultores?.map((consultor, index) => (
                <li
                  key={index}
                  className="flex w-full items-center justify-between rounded-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="grid h-12 w-12 place-content-center rounded-md bg-accent uppercase">
                      {consultor.nombres.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-x-1.5">
                      <h3 className="font-bold">
                        {consultor.nombres} {consultor.apellidos}
                      </h3>
                      <span className="text-xs leading-none">
                        {consultor.especialidades}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    onClick={() => removeConsultor(consultor.idConsultor)}
                  >
                    <X size={20} />
                    <span className="sr-only">Eliminar consultor</span>
                  </Button>
                </li>
              ))
            ) : (
              <li className="text-xs text-muted-foreground">
                No hay consultores asignados
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
