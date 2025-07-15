import { prisma } from "@/lib/prisma";
import {
  Hospital,
  Usuario,
  Paciente,
  Cateter,
  Pelicula,
  Danula,
  Equipo,
  MedicacaoRisco,
  Evolucao,
} from "@prisma/client";

export type HospitalComRelacionamentos = Hospital & {
  usuarios: Usuario[];
  pacientes: Paciente[];
  cateteres: Cateter[];
  peliculas: Pelicula[];
  danulas: Danula[];
  equipos: Equipo[];
  medicacoesRisco: MedicacaoRisco[];
  evolucoes: Evolucao[];
};

export const hospitalRepository = {
  async list(): Promise<HospitalComRelacionamentos[]> {
    try {
      return await prisma.hospital.findMany({
        include: {
          usuarios: true,
          pacientes: true,
          cateteres: true,
          peliculas: true,
          danulas: true,
          equipos: true,
          medicacoesRisco: true,
          evolucoes: true,
        },
      });
    } catch (error) {
      throw new Error("Erro ao buscar hospitais");
    }
  },

  async create(body: {
    nome: string;
    endereco?: string;
    state?: string;
    zipCode?: string;
    city?: string;
    phone?: string;
    email?: string;
    cnpj?: string;
  }): Promise<HospitalComRelacionamentos> {
    try {
      return await prisma.hospital.create({
        data: {
          nome: body.nome,
          endereco: body.endereco,
          state: body.state,
          zipCode: body.zipCode,
          city: body.city,
          phone: body.phone,
          email: body.email,
          cnpj: body.cnpj,
        },
        include: {
          usuarios: true,
          pacientes: true,
          cateteres: true,
          peliculas: true,
          danulas: true,
          equipos: true,
          medicacoesRisco: true,
          evolucoes: true,
        },
      });
    } catch (error) {
      throw new Error("Erro ao create hospital");
    }
  },

  async findById(id: string): Promise<HospitalComRelacionamentos | null> {
    try {
      return await prisma.hospital.findUnique({
        where: { id },
        include: {
          usuarios: true,
          pacientes: true,
          cateteres: true,
          peliculas: true,
          danulas: true,
          equipos: true,
          medicacoesRisco: true,
          evolucoes: true,
        },
      });
    } catch (error) {
      throw new Error("Erro ao buscar hospital");
    }
  },

  async update(
    id: string,
    body: Partial<{
      nome: string;
      endereco: string;
    }>
  ): Promise<HospitalComRelacionamentos> {
    try {
      return await prisma.hospital.update({
        where: { id },
        data: body,
        include: {
          usuarios: true,
          pacientes: true,
          cateteres: true,
          peliculas: true,
          danulas: true,
          equipos: true,
          medicacoesRisco: true,
          evolucoes: true,
        },
      });
    } catch (error) {
      throw new Error("Erro ao update hospital");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await prisma.hospital.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error("Erro ao delete hospital");
    }
  },
};
