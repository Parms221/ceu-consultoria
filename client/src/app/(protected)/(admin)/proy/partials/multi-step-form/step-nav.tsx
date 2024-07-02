"use client";
import React from "react";
import { useProjectForm } from "@/app/(protected)/(admin)/proy/partials/multi-step-form/context";
import { cn } from "@/lib/utils";
import { STEPS_VALUES } from "@/app/(protected)/(admin)/proy/partials/constants/steps";

export default function StepsNav() {
  const { currentStep } = useProjectForm();
  return (
    <section>
      <ul className={"flex justify-between gap-4"}>
        {STEPS_VALUES.map((step, index) => {
          const isCurrent = currentStep.order === step.order;

          return (
            <li
              key={step.order}
              className={cn(
                "flex items-center gap-2",
                isCurrent ? "text-primary" : "text-gray-400",
                index !== STEPS_VALUES.length - 1 && "w-full",
              )}
            >
              <div
                className={cn(
                  "flex min-h-7 min-w-7 items-center justify-center rounded-full text-sm font-semibold",
                  isCurrent ? "bg-primary text-primary-foreground" : "border",
                )}
              >
                {step.order + 1}
              </div>
              {step.name}
              {index !== STEPS_VALUES.length - 1 && (
                <div className={"h-[1px] w-full bg-primary"}></div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
