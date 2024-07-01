import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/AdminLayout";


export const metadata: Metadata = {
  title: {
    template: '%s | CEU',
    default: 'CEU',
  },
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home({
    children 
 } : { children: React.ReactNode }) {
  return (
    <>
      <DefaultLayout>
        {children}
      </DefaultLayout>
    </>
  );
}
