import PageTitle from "@/components/ui/page-title";
import ProjectFormContext from "@/app/(protected)/(admin)/proyectos/nuevo/partials/form.context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BasicProjectData from "@/app/(protected)/(admin)/proyectos/nuevo/partials/basic";

export default function Page() {
  return (
    <main>
      <PageTitle>Administración de proyectos</PageTitle>
      <ProjectFormContext>
        <Card>
          {/*<CardHeader>*/}
          {/*  <CardTitle>Nuevo proyecto</CardTitle>*/}
          {/*  <CardDescription>Ingrese los datos del proyecto</CardDescription>*/}
          {/*</CardHeader>*/}
          <CardContent>
            <BasicProjectData />
          </CardContent>
        </Card>
      </ProjectFormContext>
    </main>
  );
}
