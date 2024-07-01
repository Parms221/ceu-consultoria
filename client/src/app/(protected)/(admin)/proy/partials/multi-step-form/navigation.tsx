import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
    onClick?: () => void;
    disabled?: boolean;
}

export function Previous({ disabled = false, onClick } : Props) {
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

export function Next({ disabled = false, onClick } : Props) {
    return (
        <Button
          type={"button"}
          size={"sm"}
          variant="outline"
          disabled={disabled}
          onClick={onClick}
        >
          Siguiente <ChevronRightIcon className="h-4 w-4" />
        </Button>
    );
}

export function NavigationFooter({ children } : { children : React.ReactNode}){
  return (
    <footer className="mt-3 flex justify-end border-t border-t-primary pt-3">
      {children}
    </footer>
  )
}
