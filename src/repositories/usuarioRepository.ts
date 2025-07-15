import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import type { Usuario, Hospital, NivelAcesso } from "@prisma/client";

export type UsuarioSemSenha = Omit<Usuario, "senha"> & {
  hospital: Hospital | null;
};

export type createUsuarioDTO = {
  matricula: string;
  nomeCompleto: string;
  senha: string;
  nivelAcesso: NivelAcesso;
  hospitalId?: string | null;
  email?: string;
  phone?: string;
};

export type updateUsuarioDTO = Partial<{
  nomeCompleto: string;
  senha: string;
  nivelAcesso: NivelAcesso;
  hospitalId: string | null;
}>;

export const usuarioRepository = {
  async list(): Promise<UsuarioSemSenha[]> {
    const usuarios = await prisma.usuario.findMany({
      include: { hospital: true },
    });

    return usuarios.map(({ senha, ...rest }) => rest);
  },

  async create({
    matricula,
    nomeCompleto,
    senha,
    nivelAcesso,
    hospitalId,
    email,
    phone
  }: createUsuarioDTO): Promise<UsuarioSemSenha> {
    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        matricula,
        nomeCompleto,
        senha: hashedPassword,
        nivelAcesso,
        hospitalId,
        email,
        phone
      },
      include: { hospital: true },
    });

    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    return usuarioSemSenha;
  },

  async findById(id: string): Promise<UsuarioSemSenha | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: { hospital: true },
    });

    if (!usuario) return null;

    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  },

  async update(id: string, data: updateUsuarioDTO): Promise<UsuarioSemSenha> {
    const dadosAtualizados: any = { ...data };

    if (data.senha) {
      dadosAtualizados.senha = await bcrypt.hash(data.senha, 10);
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: dadosAtualizados,
      include: { hospital: true },
    });

    const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
    return usuarioSemSenha;
  },

  async delete(id: string): Promise<void> {
    await prisma.usuario.delete({
      where: { id },
    });
  },
};
