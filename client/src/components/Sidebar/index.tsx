"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CEULogo from "@/components/common/Logo";

import SidebarLinkGroup from "./SidebarLinkGroup";
import { SidebarLink, SidebarSubLink } from "./SidebarLink";

import { ChevronDown, ArrowLeftCircleIcon} from "lucide-react"
import { cn } from "@/lib/utils";
import { Navigation } from "@/types/shared/navigation";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  links : Navigation[]
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, links }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-ceu-celeste duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-2">
        <Link href="/" className="mx-auto">
          <CEULogo className="w-[200px] h-32 text-white" />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="absolute top-3 right-2.5 lg:hidden"
        >
         <ArrowLeftCircleIcon className="text-white"/>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <hr className="text-white"/>  

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-lg font-semibold text-bodydark1">
              MENÚ
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
                { links.map((link) => {
                  if (link.children !== undefined && link.children.length > 0){
                    return (
                      <SidebarLinkGroup
                        key={link.href}
                        activeCondition={
                          pathname.includes(link.href)
                        }
                      >
                        {(handleClick, open) => {
                          return (
                            <React.Fragment>
                              <SidebarLink
                                href={link.href}
                                onClick={(e) => {
                                  e.preventDefault();
                                  sidebarExpanded
                                    ? handleClick()
                                    : setSidebarExpanded(true);
                                }}
                              > 
                                <link.icon />
                                {link.label}
                                <ChevronDown className={cn("absolute right-4 top-1/2 -translate-y-1/2 ease-in-out duration-300", open && "rotate-180")}/>
                              </SidebarLink>
                              {/* <!-- Dropdown Menu Start --> */}
                                <div
                                  className={`translate transform overflow-hidden ${
                                    !open && "hidden"
                                  }`}
                                >
                                  <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                    {
                                      link.children?.map((sublink) => {
                                        return (
                                          <SidebarSubLink href={sublink.href} key={sublink.href}>
                                            <sublink.icon />
                                            {sublink.label}
                                          </SidebarSubLink>
                                        )
                                      })
                                    }
                                  </ul>
                                </div>
                                {/* <!-- Dropdown Menu End --> */}
                            </React.Fragment>
                          )}}
                      </SidebarLinkGroup>
                    )
                  }else {
                    return (
                      <li key={link.href}>
                        <SidebarLink
                          href={link.href}
                        >
                          <link.icon />
                          {link.label}
                        </SidebarLink>
                      </li>
                    )
                  }
                })}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
