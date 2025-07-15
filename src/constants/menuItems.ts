import { NivelAcesso } from "@prisma/client";

interface MenuItem {
  title: string;
  path?: string;
  subItems?: SubMenuItem[];
  accessLevels: string[];
}

interface SubMenuItem {
  title: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Usuários",
    accessLevels: [NivelAcesso.TI],
    subItems: [
      { title: "Cadastrar Usuário", path: "/usuarios/formulario/cadastro" },
      { title: "Listar Usuários", path: "/usuarios" },
    ],
  },
  {
    title: "Pacientes",
    accessLevels: [
      NivelAcesso.COORDENADOR_ENFERMAGEM,
      NivelAcesso.SUPERVISOR_ENFERMAGEM,
    ],
    subItems: [
      { title: "Cadastrar Paciente", path: "/pacientes/formulario/cadastro" },
      { title: "Listar Pacientes", path: "/pacientes" },
    ],
  },
  {
    title: "Cateteres",
    accessLevels: [
      NivelAcesso.COORDENADOR_ENFERMAGEM,
      NivelAcesso.SUPERVISOR_ENFERMAGEM,
      NivelAcesso.ENFERMEIRO,
      NivelAcesso.TECNICO,
    ],
    subItems: [
      { title: "Cadastrar Cateter", path: "/cateteres/formulario/cadastro" },
      { title: "Listar Cateteres", path: "/cateteres" },
    ],
  },
  {
    title: "Hospitais",
    accessLevels: [NivelAcesso.TI],
    subItems: [
      { title: "Cadastrar Hospital", path: "/hospitais/formulario/cadastro" },
      { title: "Listar Hospitais", path: "/hospitais" },
    ],
  },
  {
    title: "Danulas",
    accessLevels: [
      NivelAcesso.COORDENADOR_ENFERMAGEM,
      NivelAcesso.SUPERVISOR_ENFERMAGEM,
      NivelAcesso.ENFERMEIRO,
      NivelAcesso.TECNICO,
    ],
    subItems: [
      { title: "Cadastrar Danula", path: "/danulas/formulario/cadastro" },
      { title: "Listar Danulas", path: "/danulas" },
    ],
  },
  {
    title: "Películas",
    accessLevels: [
      NivelAcesso.COORDENADOR_ENFERMAGEM,
      NivelAcesso.SUPERVISOR_ENFERMAGEM,
      NivelAcesso.ENFERMEIRO,
      NivelAcesso.TECNICO,
    ],
    subItems: [
      { title: "Cadastrar Película", path: "/peliculas/formulario/cadastro" },
      { title: "Listar Películas", path: "/peliculas" },
    ],
  },
  {
    title: "Equipos",
    accessLevels: [
      NivelAcesso.COORDENADOR_ENFERMAGEM,
      NivelAcesso.SUPERVISOR_ENFERMAGEM,
      NivelAcesso.ENFERMEIRO,
    ],
    subItems: [
      { title: "Cadastrar Equipo", path: "/equipos/formulario/cadastro" },
      { title: "Listar Equipos", path: "/equipos" },
    ],
  },
  {
    title: "Medicações de Risco",
    accessLevels: [
      NivelAcesso.COORDENADOR_ENFERMAGEM,
      NivelAcesso.SUPERVISOR_ENFERMAGEM,
      NivelAcesso.ENFERMEIRO,
    ],
    subItems: [
      { title: "Cadastrar Medicação", path: "/medicacoes-risco/formulario/cadastro" },
      { title: "Listar Medicações", path: "/medicacoes-risco" },
    ],
  },
  {
    title: "Evoluções",
    accessLevels: [
      NivelAcesso.COORDENADOR_ENFERMAGEM,
      NivelAcesso.SUPERVISOR_ENFERMAGEM,
      NivelAcesso.ENFERMEIRO,
    ],
    subItems: [
      { title: "Criar Evolução", path: "/evolucoes/formulario/cadastro" },
      { title: "Listar Evoluções", path: "/evolucoes" },
    ],
  },
  {
    title: "Terapia Fusional",
    accessLevels: [
      NivelAcesso.COORDENADOR_ENFERMAGEM,
      NivelAcesso.SUPERVISOR_ENFERMAGEM,
      NivelAcesso.ENFERMEIRO,
    ],
    subItems: [
      { title: "Cadastrar Paciente", path: "/pacientes/formulario/cadastro" },
    ],
  },
];
