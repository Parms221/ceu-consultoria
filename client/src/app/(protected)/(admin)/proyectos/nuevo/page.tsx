import React from "react";
import PageTitle from "@/components/ui/page-title";
import ProjectFormContext from "@/app/(protected)/(admin)/proyectos/nuevo/partials/multi-step-form/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StepsNav from "@/app/(protected)/(admin)/proyectos/nuevo/partials/multi-step-form/step-nav";
import ProjectFormCardTitle from "@/app/(protected)/(admin)/proyectos/nuevo/partials/multi-step-form/card-title";
import CurrentPage from "@/app/(protected)/(admin)/proyectos/nuevo/partials/pages/current-page";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Nuevo proyecto"
};

export default async function NuevoProyecto() {
  return (
    <main className="space-y-3">
      <PageTitle>Nuevo Proyecto</PageTitle>
      <ProjectFormContext>
        <Card>
          <CardContent>
            <StepsNav />
          </CardContent>
        </Card>

        <Card className="mt-5">
          <CardHeader>
            <CardTitle>
              <ProjectFormCardTitle />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentPage />
          </CardContent>
        </Card>
      </ProjectFormContext>
    </main>
  );
}
