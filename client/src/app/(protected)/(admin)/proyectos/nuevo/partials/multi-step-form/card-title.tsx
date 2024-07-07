"use client";

import { useProjectForm } from "@/app/(protected)/(admin)/proyectos/nuevo/partials/multi-step-form/context";

export default function ProjectFormCardTitle() {
  const { currentStep } = useProjectForm();
  return (
    <span className={`${currentStep.cardTitleClasses}`}>
      {currentStep.cardTitle}
    </span>
  );
}
