import { prisma } from "@/lib/prisma";
import { Danula, Hospital, Paciente, Situacao, Turno } from "@prisma/client";
import { add } from "date-fns";

export type DanulaComRelacionamentos = Danula & {
  hospital: Hospital;
  paciente: Paciente;
};

export const danulaRepository = {
  async list(): Promise<DanulaComRelacionamentos[]> {
    try {
      const danulas = await prisma.danula.findMany({
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return danulas;
    } catch (error) {
      throw new Error("Erro ao buscar dânulas");
    }
  },

  async create(body: {
    registroPaciente: string;
    turno: Turno;
    situacao: Situacao;
    dataInsercao: Date | string;
    hospitalId: string;
    pacienteId: string;
  }): Promise<DanulaComRelacionamentos> {
    const expireIn = add(new Date(), {
      days: 7,
    });
    try {
      const novaDanula = await prisma.danula.create({
        data: {
          registroPaciente: body.registroPaciente,
          turno: body.turno,
          situacao: body.situacao,
          expireIn: new Date(expireIn),
          hospitalId: body.hospitalId,
          pacienteId: body.pacienteId,
        },
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return novaDanula;
    } catch (error) {
      throw new Error("Erro ao create dânula");
    }
  },

  async findById(id: string): Promise<DanulaComRelacionamentos | null> {
    try {
      const danula = await prisma.danula.findUnique({
        where: { id },
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return danula;
    } catch (error) {
      throw new Error("Erro ao buscar dânula");
    }
  },

  async update(
    id: string,
    body: Partial<{
      turno: Turno;
      situacao: Situacao;
      dataInsercao: Date | string;
    }>
  ): Promise<DanulaComRelacionamentos> {
    try {
      const dadosAtualizados: any = { ...body };
      if (body.dataInsercao) {
        dadosAtualizados.dataInsercao = new Date(body.dataInsercao);
      }

      const danulaAtualizada = await prisma.danula.update({
        where: { id },
        data: dadosAtualizados,
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return danulaAtualizada;
    } catch (error) {
      throw new Error("Erro ao update dânula");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await prisma.danula.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Erro ao delete dânula");
    }
  },
};
