import { NextResponse } from "next/server";
import { pacienteRepository } from "@/repositories/pacienteRepository";
import { checkPeliculasStatus } from "@/utils/checkPeliculasStatus";
import { checkEquiposStatus } from "@/utils/checkEquiposStatus";
import { checkDanulasStatus } from "@/utils/checkDanulasStatus";
import { checkCateteresStatus } from "@/utils/checkCateteresStatus";
import { Status } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const hospitalId = url.searchParams.get("hospitalId");

    if (!hospitalId) {
      return NextResponse.json(
        { error: "hospitalId é obrigatório" },
        { status: 400 }
      );
    }

    const dataRepository = await pacienteRepository.findAllWithFields(
      hospitalId
    );

    const updatedDataPeliculas = await checkPeliculasStatus(dataRepository);
    const updateDateEquipos = await checkEquiposStatus(updatedDataPeliculas);
    const updateDateDanulas = await checkDanulasStatus(updateDateEquipos);
    const updatteDateCateter = await checkCateteresStatus(updateDateDanulas);

    const data = updatteDateCateter
      .map((paciente) => {
        let priorityScore = 0;

        // if (
        //   paciente.status === Status.Obito ||
        //   paciente.status === Status.Alta_dos_Atendimentos
        // ) {
        //   priorityScore -= 1000;
        // }

        // if (paciente.status === Status.Suspenso) {
        //   priorityScore -= 500;
        // }

        // if (paciente.status === Status.Ativo) {
        //   priorityScore -= 300;
        // }

        const hasUrgentItem = [
          ...(paciente.equipos || []),
          ...(paciente.danulas || []),
          ...(paciente.peliculas || []),
          ...(paciente.cateteres || []),
        ].some(
          (item) => item.situacao === "Atencao" || item.situacao === "Vencido"
        );

        if (hasUrgentItem) {
          priorityScore += 100;
        }

        return {
          ...paciente,
          _priorityScore: priorityScore,
        };
      })
      .sort((a, b) => b._priorityScore - a._priorityScore);

    return NextResponse.json({
      message: "ok",
      data: data,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(
        { error: "Erro ao renderizar dados", message: error.message },
        { status: 500 }
      );
    }
    console.error("Erro desconhecido", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function PATCH() {
  try {
    return NextResponse.json({ message: "ok" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(
        { error: "Erro ao Renderizar Mensagem", message: error.message },
        { status: 500 }
      );
    }
    console.error("Erro desconhecido", error);
    return NextResponse.json(
      { error: "Erro ao Renderizar Mensagem" },
      { status: 500 }
    );
  }
}
