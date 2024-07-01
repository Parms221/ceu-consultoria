"use client";

import { useProjectForm } from "@/app/(protected)/(admin)/proy/partials/multi-step-form/context";

export default function ProjectFormCardTitle() {
  const { currentStep } = useProjectForm();
  return <span>{currentStep.cardTitle}</span>;
}
