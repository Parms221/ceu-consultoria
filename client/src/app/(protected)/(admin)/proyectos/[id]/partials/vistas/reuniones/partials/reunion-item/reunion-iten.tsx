import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Reunion } from "@/types/proyecto/Reunion";
import { format } from "date-fns";
import { Calendar, Copy, EllipsisVertical, SquareArrowOutUpRightIcon, Trash2Icon, User2Icon, VideoIcon } from "lucide-react";
import ItemOptions from "./item-options";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatDateRange } from "@/lib/date-format";

export default function ReunionItem({ reunion }: { reunion: Reunion }) {
 
  function MeetingDetails() {
    return (
      <div className="flex items-center gap-2">
        <aside className="rounded-md border p-3">
          <VideoIcon />
        </aside>
        <div className="flex w-full flex-col gap-2 rounded-md px-2 leading-none">
          <h4 className="font-semibold tracking-tight text-black dark:text-white ">
            {reunion.titulo}
          </h4>
          <p className="line-clamp-1">{reunion.descripcion}</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="flex flex-col gap-1 overflow-hidden py-4">
      <div className="flex justify-between">
        <MeetingDetails />
        <div>
          <Popover>
            <PopoverTrigger>
              <EllipsisVertical />
            </PopoverTrigger>
            <PopoverContent
              align="start" side="left"
              className="max-w-[80vw] sm:max-w-md"
            >
              <ItemOptions reunion={reunion} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <footer className="flex flex-col justify-between md:flex-row">
        <div className="flex items-center gap-2">
          <a
            href={reunion.enlace}
            className="text-ceu-celeste hover:underline flex items-center gap-1.5 w-fit"
            target="_blank"
            rel="noreferrer"
            onDragStartCapture={(e) => e.preventDefault()}
          >
            <SquareArrowOutUpRightIcon strokeWidth={1} size={18}/>
            {reunion.enlace}
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => {
              navigator.clipboard.writeText(reunion.enlace);
              toast.success("Enlace copiado al portapapeles");
            }}
          >
            <Copy size={16}/>
          </Button>
        </div>
        <span className="flex items-center gap-2 text-xs text-ceu-azul">
          <Calendar size={18} strokeWidth={1} />
          {formatDateRange(reunion.fechaInicio, reunion.fechaFin)}
        </span>
      </footer>
    </div>
  );
}
