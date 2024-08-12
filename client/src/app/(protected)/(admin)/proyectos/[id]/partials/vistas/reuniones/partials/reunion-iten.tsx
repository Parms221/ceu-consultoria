import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Event } from "@/types/calendar";
import { Reunion } from "@/types/proyecto/Reunion";
import { format } from "date-fns";
import { Calendar, EllipsisVertical, SquareArrowOutUpRightIcon, User2Icon, VideoIcon } from "lucide-react";

export default function ReunionItem({ reunion }: { reunion: Reunion }) {
  function formatDate(date: string) {
    return format(new Date(date), "dd/MM/yyyy hh:mm a");
  }

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

  function Options(){
    return (
        <aside>
            <div className="text-xs text-ceu-azul flex items-center gap-2">
              <User2Icon size={15}/>
              <div className="flex flex-col">
                <span>
                  Programada por
                </span>
                <strong>
                {reunion.eventOrganizer}
                </strong>
              </div>
            </div>
         </aside>
    )
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
            >
              <Options />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <footer className="flex flex-col justify-between md:flex-row">
        <a
          href={reunion.enlace}
          className="text-ceu-celeste hover:underline flex items-center gap-1.5"
          target="_blank"
          rel="noreferrer"
        >
          <SquareArrowOutUpRightIcon strokeWidth={1} size={18}/>
          {reunion.enlace}
        </a>
        <span className="flex items-center gap-2 text-xs text-ceu-azul">
          <Calendar size={18} strokeWidth={1} />
          {` ${formatDate(reunion.createdAt)} - ${formatDate(reunion.updatedAt)}`}
        </span>
      </footer>
    </div>
  );
}
