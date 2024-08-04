import { formatTime } from "@/lib/utils";
import { Input } from "./input";

interface TimeInputProps {
    className?: string;
    value : Date;
    onChange : (date : Date) => void;
} 
export default function TimeInput({ className, value, onChange }: TimeInputProps) {
    return (
        <Input 
            type="time" 
            value={formatTime(new Date(value))} 
            onChange={(e) => {
              const date = new Date(value);
              date.setHours(Number(e.target.value.split(':')[0]));
              date.setMinutes(Number(e.target.value.split(':')[1]));
              onChange(date);
            }}
            className={className}
      />
    );
}