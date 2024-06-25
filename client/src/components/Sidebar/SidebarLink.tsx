import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export function SidebarLink({
  href,
  className,
  children,
  onClick,
}: Props) {
  const pathname = usePathname();

  function isActive(href: string) {
    const split = href.split("/");
    if (split[1] !== "") {
      /*
        El primer valore del split puede ser my en el caso de consultores por la agrupación de rutas, 
        entonces se tomaría el segundo valor. Caso contrario, si es admin no tiene el /my por delante, entonces
        se toma el primer valor.
      */
      const group = split[1] === "my" ? split[2] : split[1];
      return pathname.includes(group);
    } else {
      return pathname === href;
    }
  }

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-md px-4 py-2 font-medium",
        "text-bodydark1 duration-300 ease-in-out hover:bg-white hover:text-ceu-celeste dark:hover:bg-meta-4 dark:hover:text-white",
        isActive(href) && "bg-white text-ceu-celeste dark:bg-meta-4 dark:text-white",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export function SidebarSubLink({
  href,
  className,
  children,
}: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-2.5 rounded-md px-4 py-1.5 font-medium text-neutral-300 duration-300 ease-in-out hover:text-white ${
        pathname === href && "text-whiter bg-ceu-azul"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
