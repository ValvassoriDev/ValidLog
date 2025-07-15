import { Situacao, ModeloPelicula } from "@prisma/client";
import { peliculaRepository } from "@/repositories/peliculaRepository";
import { PacienteComRelacionamentos } from "@/repositories/pacienteRepository";

export async function checkPeliculasStatus(
  patients: PacienteComRelacionamentos[]
): Promise<PacienteComRelacionamentos[]> {
  const now = new Date();

  try {
    for (const patient of patients) {
      if (!patient.peliculas || !Array.isArray(patient.peliculas)) continue;

      for (const pelicula of patient.peliculas) {
        const insertionDate = new Date(pelicula.dataInsercao);
        const hoursDifference = 
          (now.getTime() - insertionDate.getTime()) / (1000 * 60 * 60);

        let newStatus: Situacao | null = null;

        switch (pelicula.modeloPelicula) {
          case ModeloPelicula.Recem_Aplicada:
            if (hoursDifference > 24) {
              newStatus = Situacao.Vencido;
            } else if (hoursDifference > 20) {
              newStatus = Situacao.Atencao;
            } else {
              newStatus = Situacao.Manter;
            }
            break;

          case ModeloPelicula.Pelicula_com_Gaze:
            if (hoursDifference > 72) {
              newStatus = Situacao.Vencido;
            } else if (hoursDifference > 24) {
              newStatus = Situacao.Atencao;
            } else {
              newStatus = Situacao.Manter;
            }
            break;

          case ModeloPelicula.Pelicula_Fixa:
            if (hoursDifference > 168) {
              newStatus = Situacao.Vencido;
            } else if (hoursDifference > 24) {
              newStatus = Situacao.Atencao;
            } else {
              newStatus = Situacao.Manter;
            }
            break;

          default:
            continue;
        }

        if (newStatus !== null && pelicula.situacao !== newStatus) {
          await peliculaRepository.update(pelicula.id, {
            situacao: newStatus,
          });
          pelicula.situacao = newStatus;
        }
      }
    }

    return patients;
  } catch (error) {
    console.error("Erro ao verificar status das películas:", error);
    return patients;
  }
}
