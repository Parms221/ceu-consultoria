"use client"
import React, { useState } from "react";
import { Folder, FolderOpen } from 'lucide-react'
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Archivos() {
    const mockFolders  = [
        {
            id: 1,
            name: "Folder 1",
            projectId: 1,
        },
        {
            id: 2,
            name: "Folder 1",
            projectId: 1,
        },
        {
            id: 3,
            name: "Folder 1",
            projectId: 1,
        },
        {
            id: 4,
            name: "Folder 1",
            projectId: 1,
        },
        {
            id: 5,
            name: "Folder 1",
            projectId: 1,
        }
    ]

    return (
        <React.Fragment>
            <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Mis archivos
              </h2>
            </header>

            <section className="flex flex-col">
                <article className="area flex flex-wrap gap-4">
                    <Input type="text" placeholder="Buscar"/>
                    {mockFolders.map((folder)=>{
                        return (
                            <Link
                                href={`/my/proyectos/${folder.projectId}/archivos`}
                                className="text-center font-semibold [&>div>#folder]:hover:opacity-0 [&>div>#folder-open]:hover:opacity-100"
                                key={folder.id}
                            >
                                <div className="relative">
                                    <Folder size={80} strokeWidth={1} id="folder"/>
                                    <FolderOpen size={80} strokeWidth={1} id="folder-open" className="absolute top-0 opacity-0"/>
                                </div>
                                <span>{folder.name}</span>
                            </Link>
                        )
                    })}
                </article>
            </section>
        </React.Fragment>
    );
}