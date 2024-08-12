import GoogleCalendarSVG from "@/components/common/GoogleCalendarLogo";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Reunion } from "@/types/proyecto/Reunion";
import { Usuario } from "@/types/usuario";
import { format } from "date-fns";
import { Calendar, Edit, EllipsisVertical, SquareArrowOutUpRightIcon, Trash2Icon, User2Icon, VideoIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function ReunionItem({ reunion }: { reunion: Reunion }) {
  const { data : session } = useSession()
  const currentUser = session?.user as unknown as Usuario

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

  function GoogleCalendarLink(){
    return (
      <div className="absolute top-0 right-0">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a  href={reunion.eventHtmlLink} target="_blank" rel="noreferrer">  
                    <span className={"sr-only"}>Ver evento en Google calendar</span>
                    <GoogleCalendarSVG className="w-8 h-8"/>
                  </a>
                </TooltipTrigger>
                <TooltipContent className="border-none">
                  <p>Ver en calendario de eventos de Google</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
    )
  }

  function Options(){
    return (
        <aside className="space-y-2 relative">
            <GoogleCalendarLink />
            <div className="text-xs text-ceu-azul flex items-center gap-2">
              <User2Icon size={15}/>
              <div className="flex flex-col">
                <span>
                  Programada por
                </span>
                <strong>
                {reunion.eventOrganizer ?? reunion.usuario.email}
                </strong>
              </div>
            </div>
            {
             currentUser.id == reunion.usuario.id && (
                <div className="flex items-center w-full [&>button]:w-full [&>button]:h-fit [&>button]:p-0 [&>button]:rounded-none divide-x [&>button>svg]:w-4">
                  <Button>
                    <Edit />
                  </Button>
                  <Button>
                    <Trash2Icon />
                  </Button>
                </div>
              )
            }
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
              className="max-w-[80vw] sm:max-w-md"
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
