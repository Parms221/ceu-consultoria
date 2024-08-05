import { Consultor } from "@/types/consultor";

export type Participante = {
  idParticipante: string;
  createdAt: string;
  consultorParticipante?: Consultor;
};
