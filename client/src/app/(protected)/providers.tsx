"use client";
import { SessionProvider } from "next-auth/react";
import { AppProvider } from "./app.context";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AppProvider>{children}</AppProvider>
    </SessionProvider>
  );
}
