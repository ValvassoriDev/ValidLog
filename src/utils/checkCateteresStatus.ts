import { Situacao, TipoCateter } from "@prisma/client";
import { cateterRepository } from "@/repositories/cateterRepository";
import { PacienteComRelacionamentos } from "@/repositories/pacienteRepository";

export async function checkCateteresStatus(
  patients: PacienteComRelacionamentos[]
): Promise<PacienteComRelacionamentos[]> {
  const now = new Date();

  try {
    for (const patient of patients) {
      if (!patient.cateteres || !Array.isArray(patient.cateteres)) continue;

      for (const cateter of patient.cateteres) {
        if (cateter.tipoCateter !== TipoCateter.Emergencia) continue;

        const insertionDate = new Date(cateter.dataInsercao);
        const hoursDifference =
          (now.getTime() - insertionDate.getTime()) / (1000 * 60 * 60);

        let newStatus: Situacao;

        if (hoursDifference > 72) {
          newStatus = Situacao.Vencido;
        } else if (hoursDifference > 48) {
          newStatus = Situacao.Atencao;
        } else {
          newStatus = Situacao.Manter;
        }

        if (cateter.situacao !== newStatus) {
          await cateterRepository.update(cateter.id, {
            situacao: newStatus,
          });
          cateter.situacao = newStatus;
        }
      }
    }

    return patients;
  } catch (error) {
    console.error("Erro ao verificar status dos cateteres:", error);
    return patients;
  }
}
