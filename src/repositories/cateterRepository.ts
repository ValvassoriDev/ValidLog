import { prisma } from "@/lib/prisma";
import {
  Cateter,
  CondicaoCateter,
  Hospital,
  IdentificacaoStatus,
  Paciente,
  Situacao,
  TipoCateter,
  Turno,
} from "@prisma/client";
import { add } from "date-fns";

export type CateterComRelacionamentos = Cateter & {
  hospital: Hospital;
  paciente: Paciente;
};

export const cateterRepository = {
  async list(): Promise<CateterComRelacionamentos[]> {
    try {
      const cateteres = await prisma.cateter.findMany({
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return cateteres;
    } catch (error) {
      throw new Error("Erro ao buscar cateteres");
    }
  },

  async create(body: {
    registroPaciente: string;
    tipoCateter: TipoCateter;
    identificacaoStatus: IdentificacaoStatus;
    condicao: CondicaoCateter;
    turno: Turno;
    hospitalId: string;
    pacienteId: string;
  }): Promise<CateterComRelacionamentos> {
    const isEmergency = body.tipoCateter === TipoCateter.Emergencia

    const expireIn = add(new Date(), {
      days: isEmergency ? 3 : 100,
    });

    try {
      const novoCateter = await prisma.cateter.create({
        data: {
          registroPaciente: body.registroPaciente,
          tipoCateter: body.tipoCateter,
          identificacaoStatus: body.identificacaoStatus,
          condicao: body.condicao,
          turno: body.turno,
          expireIn: new Date(expireIn),
          hospitalId: body.hospitalId,
          pacienteId: body.pacienteId,
        },
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return novoCateter;
    } catch (error) {
      throw new Error("Erro ao create cateter");
    }
  },

  async findById(id: string): Promise<CateterComRelacionamentos | null> {
    try {
      const cateter = await prisma.cateter.findUnique({
        where: { id },
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return cateter;
    } catch (error) {
      throw new Error("Erro ao buscar cateter");
    }
  },

  async update(
    id: string,
    body: Partial<{
      tipoCateter: TipoCateter;
      identificacaoStatus: IdentificacaoStatus;
      condicao: CondicaoCateter;
      turno: Turno;
      situacao: Situacao;
      dataInsercao: Date | string;
    }>
  ): Promise<CateterComRelacionamentos> {
    try {
      const dadosAtualizados: any = { ...body };
      if (body.dataInsercao) {
        dadosAtualizados.dataInsercao = new Date(body.dataInsercao);
      }

      const cateterAtualizado = await prisma.cateter.update({
        where: { id },
        data: dadosAtualizados,
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return cateterAtualizado;
    } catch (error) {
      throw new Error("Erro ao update cateter");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await prisma.cateter.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Erro ao delete cateter");
    }
  },
};
