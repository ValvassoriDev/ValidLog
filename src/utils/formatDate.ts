import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: ptBR });
};
