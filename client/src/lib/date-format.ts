import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale/es";

export function formatDateRange(start: string, end: string){
    const startDate = new Date(start);
    const endDate = new Date(end);
    if(isSameDay(startDate, endDate)){
        return `
            ${format(startDate, "EEEE, d 'de' MMMM", { locale: es })} ${format(startDate, "hh:mm")} – ${format(endDate, "hh:mm a", { locale: es })}`;
        
    }

    return `
        ${format(startDate, "EEEE, d 'de' MMMM", { locale: es })} ${format(startDate, "hh:mm a")} – ${format(endDate, "EEEE, d 'de' MMMM", { locale: es })} ${format(endDate, "hh:mm a")}`;
}