import { prisma } from "@/lib/prisma";
import {
  Hospital,
  MedicacaoRisco,
  Paciente,
  Situacao,
  Turno,
} from "@prisma/client";
import { add } from "date-fns";

export type MedicacaoRiscoComRelacionamentos = MedicacaoRisco & {
  hospital: Hospital;
  paciente: Paciente;
};

export const medicacaoRiscoRepository = {
  async list(): Promise<MedicacaoRiscoComRelacionamentos[]> {
    try {
      return await prisma.medicacaoRisco.findMany({
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch {
      throw new Error("Erro ao buscar medicações de risco");
    }
  },

  async create(body: {
    registroPaciente: string;
    medicacao: string;
    duracaoHoras: number;
    turno: Turno;
    situacao: Situacao;
    hospitalId: string;
    pacienteId: string;
  }): Promise<MedicacaoRiscoComRelacionamentos> {
    const expireIn = add(new Date(), {
      hours: body.duracaoHoras,
    });
    try {
      return await prisma.medicacaoRisco.create({
        data: {
          registroPaciente: body.registroPaciente,
          medicacao: body.medicacao,
          duracaoHoras: body.duracaoHoras,
          expireIn: new Date(expireIn),
          turno: body.turno,
          situacao: body.situacao,
          hospitalId: body.hospitalId,
          pacienteId: body.pacienteId,
        },
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch {
      throw new Error("Erro ao create medicação de risco");
    }
  },

  async findById(id: string): Promise<MedicacaoRiscoComRelacionamentos | null> {
    try {
      return await prisma.medicacaoRisco.findUnique({
        where: { id },
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch {
      throw new Error("Erro ao buscar medicação de risco");
    }
  },

  async update(
    id: string,
    body: Partial<{
      medicacao: string;
      duracaoHoras: number;
      dataInsercao: Date | string;
      turno: Turno;
      situacao: Situacao;
    }>
  ): Promise<MedicacaoRiscoComRelacionamentos> {
    try {
      const dadosAtualizados: any = { ...body };
      if (body.dataInsercao) {
        dadosAtualizados.dataInsercao = new Date(body.dataInsercao);
      }

      return await prisma.medicacaoRisco.update({
        where: { id },
        data: dadosAtualizados,
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch {
      throw new Error("Erro ao update medicação de risco");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await prisma.medicacaoRisco.delete({
        where: { id },
      });
    } catch {
      throw new Error("Erro ao delete medicação de risco");
    }
  },
};
