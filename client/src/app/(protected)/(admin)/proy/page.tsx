import React from "react";
import MultiStepForm from "./partials/multi-step-form/multi-step-form";
import PageTitle from "@/components/ui/page-title";
import ProjectFormContext from "@/app/(protected)/(admin)/proy/partials/multi-step-form/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StepsNav from "@/app/(protected)/(admin)/proy/partials/multi-step-form/step-nav";
import ProjectFormCardTitle from "@/app/(protected)/(admin)/proy/partials/multi-step-form/card-title";
import CurrentPage from "@/app/(protected)/(admin)/proy/partials/pages/current-page";

export default async function Page() {
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

  // return (
  //   <React.Fragment>
  //     <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
  //       <h2 className="text-title-md2 font-semibold text-black dark:text-white">
  //         Nuevo Proyecto
  //       </h2>
  //
  //       {/* <AddUserDialog /> */}
  //     </div>
  //
  //     {/* <section className="flex flex-col gap-8 my-5">
  //               <article className="border-stroke bg-white dark:border-strokedark dark:bg-boxdark pb-4 px-2 rounded-md">
  //                   <div className="p-5">
  //                       Hola
  //                   </div>
  //               </article>
  //           </section> */}
  //
  //     <section className="flex flex-col gap-8">
  //       <article className="rounded-md border-stroke bg-white px-2 pb-4 dark:border-strokedark dark:bg-boxdark">
  //         <MultiStepForm />
  //       </article>
  //     </section>
  //   </React.Fragment>
  // );
}
