import { cn } from "@/lib/utils";
import React from "react";

export default function ItemDetail({
  icon,
  title,
  value,
  className
}: {
  icon?: React.ReactNode;
  title: string | React.ReactNode;
  value?: string | React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
        "flex items-start gap-2 text-xs text-ceu-azul",
        className
    )}>
      {icon}
      <div className="flex flex-col w-full">
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
