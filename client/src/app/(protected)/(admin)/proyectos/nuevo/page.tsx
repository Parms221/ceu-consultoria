import PageTitle from "@/components/ui/page-title";
import ProjectFormContext from "@/app/(protected)/(admin)/proyectos/nuevo/partials/form.context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BasicProjectData from "@/app/(protected)/(admin)/proyectos/nuevo/partials/title";
import SelectClient from "@/app/(protected)/(admin)/proyectos/nuevo/partials/select-cliente";
import SelectServicio from "@/app/(protected)/(admin)/proyectos/nuevo/partials/select-servicio";
import DescripcionProjectData from "@/app/(protected)/(admin)/proyectos/nuevo/partials/description";

export default function Page() {
  return (
    <main>
      <PageTitle>Administración de proyectos</PageTitle>
      <ProjectFormContext>
        <Card className="mt-3">
          {/*<CardHeader>*/}
          {/*  <CardTitle>Nuevo proyecto</CardTitle>*/}
          {/*  <CardDescription>Ingrese los datos del proyecto</CardDescription>*/}
          {/*</CardHeader>*/}
          <CardContent>
            <BasicProjectData />
            <div className="ml-10">
              <SelectClient />
              <SelectServicio />
            </div>
            <DescripcionProjectData />
          </CardContent>
        </Card>
      </ProjectFormContext>
    </main>
  );
}
