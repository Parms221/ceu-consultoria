import { Metadata } from "next";
import ConsultorLayout from "@/components/Layouts/ConsultorLayout";


export const metadata: Metadata = {
  title:
    "CEU",
  description: "Vista de consultor",
};

export default function Home({
    children 
 } : { children: React.ReactNode }) {
  return (
    <>
      <ConsultorLayout>
        {children}
      </ConsultorLayout>
    </>
  );
}
