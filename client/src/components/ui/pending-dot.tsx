import { cn } from "@/lib/utils";

interface PendingDotProps {
    className?: string;
}
export default function PendingDot(props : PendingDotProps) {
  return (
    <div className={
        cn(
            "relative",
            props.className
        )
    }>
      <span
        className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1`}
      >
        <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
      </span>
    </div>
  );
}
