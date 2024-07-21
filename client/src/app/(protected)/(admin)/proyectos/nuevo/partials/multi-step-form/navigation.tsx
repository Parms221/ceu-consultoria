import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useProjectForm } from "./context";
import { STEPS_VALUES } from "../constants/steps";

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  lastStep?: boolean;
}

export function Previous({ disabled = false, onClick }: Props) {
  return (
    <Button
      type={"button"}
      size={"sm"}
      variant="outline"
      disabled={disabled}
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      Anterior
    </Button>
  );
}

export function Next({ disabled = false, onClick, lastStep }: Props) {
  return (
    <Button
      type={"button"}
      size={"sm"}
      variant="outline"
      disabled={disabled}
      onClick={onClick}
    >
      {lastStep ? "Finalizar" : "Siguiente"}{" "}
      <ChevronRightIcon className="h-4 w-4" />
    </Button>
  );
}

export function NavigationFooter({ children }: { children: React.ReactNode }) {
  return (
    <footer className="mt-3 flex items-center justify-end gap-2 border-t border-t-primary pt-3">
      {children}
    </footer>
  );
}
