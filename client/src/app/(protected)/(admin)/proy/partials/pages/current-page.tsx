"use client";

import { useProjectForm } from "@/app/(protected)/(admin)/proy/partials/multi-step-form/context";
import ProjectFormPage1 from "@/app/(protected)/(admin)/proy/partials/pages/page1";
import { ChevronLeft, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectFormPage2 from "@/app/(protected)/(admin)/proy/partials/pages/page2";

export default function CurrentPage() {
  const { currentStep, next, prev } = useProjectForm();
  switch (currentStep.order) {
    case 0:
      return <ProjectFormPage1 />;
    case 1:
      return <ProjectFormPage2 />;
    case 2:
      return (
        <div>
          <Button
            type={"button"}
            size={"sm"}
            variant="outline"
            onClick={() => prev()}
          >
            <ChevronLeftIcon className="h-4 w-4" /> Anterior
          </Button>
          <Button
            type={"button"}
            size={"sm"}
            variant="outline"
            onClick={() => next()}
          >
            Siguiente <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    case 3:
      return (
        <div>
          <Button
            type={"button"}
            size={"sm"}
            variant="outline"
            onClick={() => prev()}
          >
            <ChevronLeftIcon className="h-4 w-4" /> Anterior
          </Button>
          <Button
            type={"button"}
            size={"sm"}
            variant="outline"
            onClick={() => next()}
          >
            Siguiente <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    default:
      return (
        <div>
          <h1>Page 1</h1>
        </div>
      );
  }
}
