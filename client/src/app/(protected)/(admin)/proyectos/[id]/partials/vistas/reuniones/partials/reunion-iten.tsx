import { Event } from "@/types/calendar";

interface IReunionItemProps {
    title: string;
    creator: string;
    start : string;
    meetingUrl : string;
    end? : string;
    event? : Event
}

export default function ReunionItem(
    props: IReunionItemProps
) {
  const { title } = props
  return (
    <div>
        {title}
    </div>
  );
}