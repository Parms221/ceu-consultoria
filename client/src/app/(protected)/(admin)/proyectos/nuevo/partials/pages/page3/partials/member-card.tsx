"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Consultor } from "@/types/consultor";
import { Plus, PlusIcon } from "lucide-react";
import { useProjectForm } from "../../../multi-step-form/context";

interface IMemberCardProps {
  member: Consultor;
}

export default function MemberCard({ member }: IMemberCardProps) {
  const { form } = useProjectForm();

  return (
    <Card className="flex w-full flex-col gap-4 px-0">
      <CardHeader className="flex flex-col justify-between p-0 sm:flex-row">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/images/user/user-05.png" />
            <AvatarFallback>
              {member.nombres.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="shrink-0 text-nowrap text-sm font-medium">
              {member.nombres} {member.apellidos}
            </h3>
            <span className="text-sm text-muted-foreground">Consultor</span>
          </div>
        </div>
        <div className="flex flex-col text-center text-sm text-primary">
          <span>0</span>
          <span className="text-xs">Proyectos asignados</span>
        </div>
      </CardHeader>
      <div className="flex items-center gap-2">
        <Badge variant="default">{member.especialidades}</Badge>
      </div>
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => {
          const asigned = form.getValues().participantes;
          console.log(asigned);
          if (asigned) {
            form.setValue("participantes", [...asigned, member]);
          } else {
            form.setValue("participantes", [member]);
          }
        }}
      >
        <PlusIcon className="h-4 w-4" />
        <span>Añadir al proyecto</span>
      </Button>
    </Card>
  );
}
