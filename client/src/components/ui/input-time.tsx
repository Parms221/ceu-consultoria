import { formatTime } from "@/lib/utils";
import { Input } from "./input";
import { useEffect, useRef, forwardRef } from "react";

interface TimeInputProps {
    className?: string;
    value: Date;
    onChange: (date: Date) => void;
}

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, value, onChange }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          e.preventDefault();
        }
      };

      const inputElement = inputRef.current;

      if (inputElement) {
        inputElement.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        if (inputElement) {
          inputElement.removeEventListener('keydown', handleKeyDown);
        }
      };
    }, []);

    return (
      <Input
        ref={inputRef}
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
);

TimeInput.displayName = "TimeInput";

export default TimeInput;