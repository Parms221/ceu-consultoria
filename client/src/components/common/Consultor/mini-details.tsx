import { Badge } from "@/components/ui/badge";
import { Consultor } from "@/types/consultor";

export default function ConsultorMiniDetails({ consultor }: { consultor: Consultor }) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-neutral-300 pr-2 w-full">
        <div className="grid h-12 w-12 place-content-center rounded-md bg-accent uppercase">
          {consultor.nombres.charAt(0)}
        </div>
        <div className="flex flex-col gap-x-1.5">
          <h3 className="font-bold text-sm">
            {consultor.nombres} {consultor.apellidos}
          </h3>
          {/* <span className="text-xs leading-none">{consultor.especialidades}</span> */}
          <Badge className="w-fit h-4"> {"Consultor"} </Badge>
        </div>
      </div>
    );
  }
  