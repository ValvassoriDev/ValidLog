import { Turno } from "@prisma/client";

export function determineShift(time: string): Turno {
  const [hours] = time.split(":").map(Number);

  if (Number.isNaN(hours) || hours < 0 || hours >= 24) {
    throw new Error(`Formato de horário inválido: ${time}`);
  }

  if (hours >= 0 && hours < 6) {
    return Turno.MADRUGADA
  };

  if (hours >= 6 && hours < 12) {
    return Turno.MANHA
  };

  if (hours >= 12 && hours < 18) {
    return Turno.TARDE
  };

  if (hours >= 18 && hours < 24) {
    return Turno.NOITE
  };

  throw new Error(`Não foi possível determinar o turno para o horário: ${time}`);
}
