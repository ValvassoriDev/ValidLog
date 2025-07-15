import { prisma } from "@/lib/prisma";
import {
  Equipo,
  Hospital,
  Paciente,
  Situacao,
  TipoEquipo,
  Turno,
} from "@prisma/client";
import { add } from "date-fns";

export type EquipoComRelacionamentos = Equipo & {
  hospital: Hospital;
  paciente: Paciente;
};

export const equipoRepository = {
  async list(): Promise<EquipoComRelacionamentos[]> {
    try {
      const equipos = await prisma.equipo.findMany({
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return equipos;
    } catch (error) {
      throw new Error("Erro ao buscar equipos");
    }
  },

  async create(body: {
    registroPaciente: string;
    tipo: TipoEquipo;
    turno: Turno;
    situacao: Situacao;
    hospitalId: string;
    pacienteId: string;
  }): Promise<EquipoComRelacionamentos> {
    const expireIn = add(new Date(), {
      days: 3,
    });
    try {
      const novoEquipo = await prisma.equipo.create({
        data: {
          registroPaciente: body.registroPaciente,
          tipo: body.tipo,
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

      return novoEquipo;
    } catch (error) {
      throw new Error("Erro ao create equipo");
    }
  },

  async findById(id: string): Promise<EquipoComRelacionamentos | null> {
    try {
      const equipo = await prisma.equipo.findUnique({
        where: { id },
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return equipo;
    } catch (error) {
      throw new Error("Erro ao buscar equipo");
    }
  },

  async update(
    id: string,
    body: Partial<{
      tipo: TipoEquipo;
      turno: Turno;
      situacao: Situacao;
      dataInsercao: Date | string;
    }>
  ): Promise<EquipoComRelacionamentos> {
    try {
      const dadosAtualizados: any = { ...body };
      if (body.dataInsercao) {
        dadosAtualizados.dataInsercao = new Date(body.dataInsercao);
      }

      const equipoAtualizado = await prisma.equipo.update({
        where: { id },
        data: dadosAtualizados,
        include: {
          hospital: true,
          paciente: true,
        },
      });

      return equipoAtualizado;
    } catch (error) {
      throw new Error("Erro ao update equipo");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await prisma.equipo.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Erro ao delete equipo");
    }
  },
};
