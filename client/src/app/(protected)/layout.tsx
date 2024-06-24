import Providers from "./providers";
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
   <Providers>
        {children}
   </Providers>
  );
}
