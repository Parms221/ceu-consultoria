import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Gestión de proyectos | CEU",
  description: "Plataforma de gestión de proyectos de Grupo CEU S.A.C.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="min-h-screen dark:bg-boxdark-2 dark:text-bodydark">
          {children}
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
