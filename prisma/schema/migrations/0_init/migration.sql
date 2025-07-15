-- CreateEnum
CREATE TYPE "Method" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "Tables" AS ENUM ('Cateter', 'Paciente', 'Pelicula', 'Equipo', 'Danula', 'Usuario', 'Hospital');

-- CreateEnum
CREATE TYPE "NivelAcesso" AS ENUM ('COORDENADOR_ENFERMAGEM', 'SUPERVISOR_ENFERMAGEM', 'ENFERMEIRO', 'TECNICO', 'TI');

-- CreateEnum
CREATE TYPE "TipoSanguineo" AS ENUM ('A_Pos', 'A_Neg', 'B_Pos', 'B_Neg', 'AB_Pos', 'AB_Neg', 'O_Pos', 'O_Neg');

-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Alta', 'Internado', 'Transferido', 'Obito');

-- CreateEnum
CREATE TYPE "TipoCateter" AS ENUM ('Periferico', 'Central', 'PICC', 'Portocath', 'Periferico_Longo', 'Sem_Acesso', 'Emergencia', 'PowerPICC');

-- CreateEnum
CREATE TYPE "IdentificacaoStatus" AS ENUM ('Identificada_via_Central', 'Identificado', 'Nao_Identificado');

-- CreateEnum
CREATE TYPE "CondicaoCateter" AS ENUM ('Em_Ordem', 'Padronizar', 'Atencao');

-- CreateEnum
CREATE TYPE "TipoEquipo" AS ENUM ('Simples', 'Bomba');

-- CreateEnum
CREATE TYPE "Turno" AS ENUM ('MANHA', 'TARDE', 'NOITE', 'MADRUGADA');

-- CreateEnum
CREATE TYPE "Situacao" AS ENUM ('Manter', 'Atencao', 'Vencido', 'Removido');

-- CreateEnum
CREATE TYPE "ModeloPelicula" AS ENUM ('Recem_Aplicada', 'Pelicula_com_Gaze', 'Pelicula_Fixa');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Ativo', 'Bloqueado');

-- CreateEnum
CREATE TYPE "HospitalStatus" AS ENUM ('Ativo', 'Bloqueado');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nivelAcesso" "NivelAcesso" NOT NULL,
    "hospitalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'Ativo',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitais" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT,
    "cnpj" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "state" TEXT,
    "status" "HospitalStatus" NOT NULL DEFAULT 'Ativo',
    "zipCode" TEXT,

    CONSTRAINT "hospitais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" TEXT NOT NULL,
    "registroPaciente" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "abreviacaoNome" TEXT NOT NULL,
    "sexo" "Sexo" NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "insertedBy" TEXT,
    "status" "Status" NOT NULL DEFAULT 'Internado',

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cateteres" (
    "id" TEXT NOT NULL,
    "registroPaciente" TEXT NOT NULL,
    "tipoCateter" "TipoCateter" NOT NULL,
    "identificacaoStatus" "IdentificacaoStatus" NOT NULL,
    "condicao" "CondicaoCateter" NOT NULL,
    "turno" "Turno" NOT NULL,
    "situacao" "Situacao" NOT NULL DEFAULT 'Manter',
    "dataInsercao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospitalId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expireIn" TIMESTAMP(3) NOT NULL,
    "insertedBy" TEXT,

    CONSTRAINT "cateteres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peliculas" (
    "id" TEXT NOT NULL,
    "registroPaciente" TEXT NOT NULL,
    "modeloPelicula" "ModeloPelicula" NOT NULL,
    "turno" "Turno" NOT NULL,
    "situacao" "Situacao" NOT NULL DEFAULT 'Manter',
    "dataInsercao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospitalId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expireIn" TIMESTAMP(3) NOT NULL,
    "insertedBy" TEXT,

    CONSTRAINT "peliculas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "danulas" (
    "id" TEXT NOT NULL,
    "registroPaciente" TEXT NOT NULL,
    "turno" "Turno" NOT NULL,
    "situacao" "Situacao" NOT NULL DEFAULT 'Manter',
    "dataInsercao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospitalId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expireIn" TIMESTAMP(3) NOT NULL,
    "insertedBy" TEXT,

    CONSTRAINT "danulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipos" (
    "id" TEXT NOT NULL,
    "registroPaciente" TEXT NOT NULL,
    "tipo" "TipoEquipo" NOT NULL,
    "turno" "Turno" NOT NULL,
    "situacao" "Situacao" NOT NULL DEFAULT 'Manter',
    "dataInsercao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospitalId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expireIn" TIMESTAMP(3) NOT NULL,
    "insertedBy" TEXT,

    CONSTRAINT "equipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicacoes_risco" (
    "id" TEXT NOT NULL,
    "registroPaciente" TEXT NOT NULL,
    "medicacao" TEXT NOT NULL,
    "duracaoHoras" INTEGER NOT NULL,
    "dataInsercao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "turno" "Turno" NOT NULL,
    "situacao" "Situacao" NOT NULL DEFAULT 'Manter',
    "hospitalId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expireIn" TIMESTAMP(3) NOT NULL,
    "insertedBy" TEXT,

    CONSTRAINT "medicacoes_risco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evolucoes" (
    "id" TEXT NOT NULL,
    "registroPaciente" TEXT NOT NULL,
    "anotacao" TEXT NOT NULL,
    "profissional" TEXT NOT NULL,
    "turno" "Turno" NOT NULL,
    "dataEvolucao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospitalId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "insertedBy" TEXT,

    CONSTRAINT "evolucoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logs" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hospitalId" TEXT NOT NULL,
    "patiendId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "table" "Tables" NOT NULL DEFAULT 'Usuario',
    "method" "Method" NOT NULL,
    "valueBefore" JSONB NOT NULL,
    "valueAfter" JSONB NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_matricula_key" ON "usuarios"("matricula");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pacientes" ADD CONSTRAINT "pacientes_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cateteres" ADD CONSTRAINT "cateteres_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cateteres" ADD CONSTRAINT "cateteres_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peliculas" ADD CONSTRAINT "peliculas_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "peliculas" ADD CONSTRAINT "peliculas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "danulas" ADD CONSTRAINT "danulas_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "danulas" ADD CONSTRAINT "danulas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipos" ADD CONSTRAINT "equipos_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipos" ADD CONSTRAINT "equipos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicacoes_risco" ADD CONSTRAINT "medicacoes_risco_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicacoes_risco" ADD CONSTRAINT "medicacoes_risco_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoes" ADD CONSTRAINT "evolucoes_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoes" ADD CONSTRAINT "evolucoes_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_patiendId_fkey" FOREIGN KEY ("patiendId") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

