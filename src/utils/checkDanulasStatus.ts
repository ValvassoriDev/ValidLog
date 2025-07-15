import { Situacao } from "@prisma/client";
import { danulaRepository } from "@/repositories/danulaRepository";
import { PacienteComRelacionamentos } from "@/repositories/pacienteRepository";

export async function checkDanulasStatus(
  patients: PacienteComRelacionamentos[]
): Promise<PacienteComRelacionamentos[]> {
  const now = new Date();

  try {
    for (const patient of patients) {
      if (!patient.danulas || !Array.isArray(patient.danulas)) continue;

      for (const danula of patient.danulas) {
        const insertionDate = new Date(danula.dataInsercao);
        const hoursDifference =
          (now.getTime() - insertionDate.getTime()) / (1000 * 60 * 60);

        let newStatus: Situacao;

        if (hoursDifference > 72) {
          newStatus = Situacao.Vencido;
        } else if (hoursDifference > 24) {
          newStatus = Situacao.Atencao;
        } else {
          newStatus = Situacao.Manter;
        }

        if (danula.situacao !== newStatus) {
          await danulaRepository.update(danula.id, {
            situacao: newStatus,
          });
          danula.situacao = newStatus;
        }
      }
    }

    return patients;
  } catch (error) {
    console.error("Erro ao verificar status das dánulas:", error);
    return patients;
  }
}
