import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Reunion } from "@/types/proyecto/Reunion";
import GoogleCalendarSVG from "../GoogleCalendarLogo";

export default function GoogleCalendarLink(
    { reunion }: { reunion: Reunion }
){
    return (
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
    )
  }