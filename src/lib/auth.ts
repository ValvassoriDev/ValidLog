import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/entrar',
    error: '/entrar',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.matricula = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.matricula as string;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        matricula: { label: 'matricula', type: 'matricula' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, unknown>) {
        const matricula = credentials?.matricula as string;
        const password = credentials?.password as string;

        if (!matricula || !password) {
          throw new Error('Preencha todos os campos para continuar.');
        }

        const user = await prisma.usuario.findUnique({
          where: { matricula },
        });

        if (!user) {
          throw new Error('Matrícula ou senha inválidos.');
        }

        const passwordMatch = await bcrypt.compare(password, user.senha);
        if (!passwordMatch) {
          throw new Error('Matrícula ou senha inválidos.');
        }

        return { id: user.id.toString(), matricula: user.matricula, nivelAcesso: user.nivelAcesso, hospital: user.hospitalId };
      },
    }),
  ],
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
