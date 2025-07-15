import { Situacao } from "@prisma/client";
import { equipoRepository } from "@/repositories/equipoRepository";
import { PacienteComRelacionamentos } from "@/repositories/pacienteRepository";

export async function checkEquiposStatus(
  patients: PacienteComRelacionamentos[]
): Promise<PacienteComRelacionamentos[]> {
  const now = new Date();

  try {
    for (const patient of patients) {
      if (!patient.equipos || !Array.isArray(patient.equipos)) continue;

      for (const equipo of patient.equipos) {
        const insertionDate = new Date(equipo.dataInsercao);
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

        if (equipo.situacao !== newStatus) {
          await equipoRepository.update(equipo.id, {
            situacao: newStatus,
          });
          equipo.situacao = newStatus;
        }
      }
    }

    return patients;
  } catch (error) {
    console.error("Erro ao verificar status dos equipos:", error);
    return patients;
  }
}
