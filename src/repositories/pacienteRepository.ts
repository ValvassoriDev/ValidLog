import { prisma } from "@/lib/prisma";
import {
  Paciente,
  Sexo,
  Status,
  Hospital,
  Pelicula,
  MedicacaoRisco,
  Evolucao,
  Equipo,
  Danula,
  Cateter,
} from "@prisma/client";

export type PacienteComRelacionamentos = Paciente & {
  hospital: Hospital | null;
  peliculas?: Pelicula[];
  medicacoesRisco?: MedicacaoRisco[];
  evolucoes?: Evolucao[];
  equipos?: Equipo[];
  danulas?: Danula[];
  cateteres?: Cateter[];
  _count?: any;
};

export const pacienteRepository = {
  async list(): Promise<PacienteComRelacionamentos[]> {
    try {
      return await prisma.paciente.findMany({
        include: { hospital: true },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      throw new Error("Erro ao buscar pacientes");
    }
  },

  async findAllWithFields(
    hospitalId?: string
  ): Promise<PacienteComRelacionamentos[]> {
    try {
      const whereClause = hospitalId ? { hospitalId: hospitalId, status: Status.Internado } : {};

      return await prisma.paciente.findMany({
        where: whereClause,
        include: {
          hospital: true,
          peliculas: true,
          medicacoesRisco: true,
          evolucoes: true,
          equipos: true,
          danulas: true,
          cateteres: true,
          _count: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      throw new Error("Erro ao buscar pacientes");
    }
  },

  async create(body: {
    registroPaciente: string;
    nomeCompleto: string;
    abreviacaoNome: string;
    sexo: Sexo;
    roomNumber: string;
    hospitalId: string;
  }): Promise<PacienteComRelacionamentos> {
    try {
      return await prisma.paciente.create({
        data: {
          registroPaciente: body.registroPaciente,
          nomeCompleto: body.nomeCompleto,
          abreviacaoNome: body.abreviacaoNome,
          sexo: body.sexo,
          roomNumber: body.roomNumber,
          hospitalId: body.hospitalId,
        },
        include: { hospital: true },
      });
    } catch {
      throw new Error("Erro ao create paciente");
    }
  },

  async findById(id: string): Promise<PacienteComRelacionamentos | null> {
    try {
      return await prisma.paciente.findUnique({
        where: { id },
        include: {
          hospital: true,
          peliculas: true,
          medicacoesRisco: true,
          evolucoes: true,
          equipos: true,
          danulas: true,
          cateteres: true,
        },
      });
    } catch {
      throw new Error("Erro ao buscar paciente");
    }
  },

  async update(
    id: string,
    body: Partial<{
      nomeCompleto: string;
      abreviacaoNome: string;
      sexo: Sexo;
      hospitalId: string;
      status: Status;
    }>
  ): Promise<PacienteComRelacionamentos> {
    try {
      return await prisma.paciente.update({
        where: { id },
        data: { status: body.status },
        include: { hospital: true },
      });
    } catch {
      throw new Error("Erro ao update paciente");
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await prisma.paciente.delete({
        where: { id },
      });
    } catch {
      throw new Error("Erro ao delete paciente");
    }
  },
};
