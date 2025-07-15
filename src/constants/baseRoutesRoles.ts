import { NivelAcesso } from "@prisma/client";

export const BASE_ROUTES_ROLES = {
  home: ["*"],
  cadastro: ["*"],
  entrar: ["*"],
  not_found: ["*"],
  internal_error: ["*"],
  unauthorized: ["*"],
  reports: ["*"],
  cateteres: [
    NivelAcesso.ENFERMEIRO,
    NivelAcesso.COORDENADOR_ENFERMAGEM,
    NivelAcesso.SUPERVISOR_ENFERMAGEM,
  ],
  hospitais: [
    NivelAcesso.TI,
  ],
  usuarios: [
    NivelAcesso.TI,
    NivelAcesso.COORDENADOR_ENFERMAGEM,
    NivelAcesso.SUPERVISOR_ENFERMAGEM
  ],
  pacientes: [
    NivelAcesso.TECNICO,
    NivelAcesso.ENFERMEIRO,
    NivelAcesso.COORDENADOR_ENFERMAGEM,
    NivelAcesso.SUPERVISOR_ENFERMAGEM
  ],
  danulas: [
    NivelAcesso.TECNICO,
    NivelAcesso.ENFERMEIRO,
    NivelAcesso.COORDENADOR_ENFERMAGEM,
    NivelAcesso.SUPERVISOR_ENFERMAGEM
  ],
  equipos: [
    NivelAcesso.TECNICO,
    NivelAcesso.ENFERMEIRO,
    NivelAcesso.COORDENADOR_ENFERMAGEM,
    NivelAcesso.SUPERVISOR_ENFERMAGEM
  ],
  medicacoes_risco: [
    NivelAcesso.TECNICO,
    NivelAcesso.ENFERMEIRO,
    NivelAcesso.COORDENADOR_ENFERMAGEM,
    NivelAcesso.SUPERVISOR_ENFERMAGEM
  ],
  evolucoes: [
    NivelAcesso.TECNICO,
    NivelAcesso.ENFERMEIRO,
    NivelAcesso.COORDENADOR_ENFERMAGEM,
    NivelAcesso.SUPERVISOR_ENFERMAGEM
  ],
  peliculas: [
    NivelAcesso.TECNICO,
    NivelAcesso.ENFERMEIRO,
    NivelAcesso.COORDENADOR_ENFERMAGEM,
    NivelAcesso.SUPERVISOR_ENFERMAGEM
  ]
};
