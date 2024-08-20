import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Event } from "@/types/calendar";

interface EventDetailProps {
    event: Event
    day: Number
}

export default function EventDetail(
    { event, day }: EventDetailProps
){
    return (
        <div>
            {day.toString()}
        </div>
    )
}