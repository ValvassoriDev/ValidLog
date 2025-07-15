import { prisma } from "@/lib/prisma";
import { Evolucao, Hospital, Paciente, Turno } from "@prisma/client";

export type EvolucaoComRelacionamentos = Evolucao & {
  hospital: Hospital;
  paciente: Paciente;
};

export const evolucaoRepository = {
  async list(): Promise<EvolucaoComRelacionamentos[]> {
    try {
      return await prisma.evolucao.findMany({
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch (error) {
      throw new Error("Erro ao buscar evoluções");
    }
  },

  async create(body: {
    registroPaciente: string;
    anotacao: string;
    profissional: string;
    turno: Turno;
    hospitalId: string;
    pacienteId: string;
  }): Promise<EvolucaoComRelacionamentos> {
    try {
      return await prisma.evolucao.create({
        data: {
          registroPaciente: body.registroPaciente,
          anotacao: body.anotacao,
          profissional: body.profissional,
          turno: body.turno,
          hospitalId: body.hospitalId,
          pacienteId: body.pacienteId,
        },
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch (error) {
      throw new Error("Erro ao create evolução");
    }
  },

  async findById(id: string): Promise<EvolucaoComRelacionamentos | null> {
    try {
      return await prisma.evolucao.findUnique({
        where: { id },
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch (error) {
      throw new Error("Erro ao buscar evolução");
    }
  },

  async update(
    id: string,
    body: Partial<{
      anotacao: string;
      profissional: string;
      turno: Turno;
      dataEvolucao: Date | string;
    }>
  ): Promise<EvolucaoComRelacionamentos> {
    try {
      const dadosAtualizados: any = { ...body };
      if (body.dataEvolucao) {
        dadosAtualizados.dataEvolucao = new Date(body.dataEvolucao);
      }

      return await prisma.evolucao.update({
        where: { id },
        data: dadosAtualizados,
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch (error) {
      throw new Error("Erro ao update evolução");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await prisma.evolucao.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Erro ao delete evolução");
    }
  },
};
