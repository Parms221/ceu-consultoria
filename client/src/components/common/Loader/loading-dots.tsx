import React from "react";
import styles from "./style.module.css";
import { cn } from "@/lib/utils";

const BouncingDotsLoader = (
    { className }: { className?: string } = {}
) => {
  return (
      <div className={cn(
        "[&>div]:h-4 [&>div]:w-4 [&>div]:m-1 text-white [&>div]:rounded-full [&>div]:bg-black",
        styles.bouncingLoader,
        className
      )}>
        <div></div>
        <div></div>
        <div></div>
      </div>
  );
};

export default BouncingDotsLoader;