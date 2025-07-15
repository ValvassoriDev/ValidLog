import { prisma } from "@/lib/prisma";
import {
  Hospital,
  ModeloPelicula,
  Paciente,
  Pelicula,
  Situacao,
  Turno,
} from "@prisma/client";
import { add } from "date-fns";

export type PeliculaComRelacionamentos = Pelicula & {
  hospital: Hospital;
  paciente: Paciente;
};

export const peliculaRepository = {
  async list(): Promise<PeliculaComRelacionamentos[]> {
    try {
      return await prisma.pelicula.findMany({
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch {
      throw new Error("Erro ao buscar películas");
    }
  },

  async create(body: {
    registroPaciente: string;
    modeloPelicula: ModeloPelicula;
    turno: Turno;
    situacao: Situacao;
    hospitalId: string;
    pacienteId: string;
  }): Promise<PeliculaComRelacionamentos> {
    var days
    if (body.modeloPelicula === ModeloPelicula.Recem_Aplicada) {
      days = 1
    }

    if (body.modeloPelicula === ModeloPelicula.Pelicula_com_Gaze) {
      days = 3
    }

    if (body.modeloPelicula === ModeloPelicula.Pelicula_Fixa) {
      days = 7
    }

    const expireIn = add(new Date(), {
      days
    });
    try {
      return await prisma.pelicula.create({
        data: {
          registroPaciente: body.registroPaciente,
          modeloPelicula: body.modeloPelicula,
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
    } catch {
      throw new Error("Erro ao create película");
    }
  },

  async findById(id: string): Promise<PeliculaComRelacionamentos | null> {
    try {
      return await prisma.pelicula.findUnique({
        where: { id },
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch {
      throw new Error("Erro ao buscar película");
    }
  },

  async update(
    id: string,
    body: Partial<{
      modeloPelicula: ModeloPelicula;
      turno: Turno;
      situacao: Situacao;
      dataInsercao: Date | string;
    }>
  ): Promise<PeliculaComRelacionamentos> {
    try {
      const dadosAtualizados: any = { ...body };
      if (body.dataInsercao) {
        dadosAtualizados.dataInsercao = new Date(body.dataInsercao);
      }

      return await prisma.pelicula.update({
        where: { id },
        data: dadosAtualizados,
        include: {
          hospital: true,
          paciente: true,
        },
      });
    } catch {
      throw new Error("Erro ao update película");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await prisma.pelicula.delete({
        where: { id },
      });
    } catch {
      throw new Error("Erro ao delete película");
    }
  },
};
