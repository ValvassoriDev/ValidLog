import {
  NivelAcesso, Sexo,
  TipoCateter, IdentificacaoStatus, CondicaoCateter,
  TipoEquipo, Turno, Situacao, ModeloPelicula
} from "@prisma/client";

export const nivelAcessoLabels = {
  [NivelAcesso.COORDENADOR_ENFERMAGEM]: "Coordenador de Enfermagem",
  [NivelAcesso.SUPERVISOR_ENFERMAGEM]: "Supervisor de Enfermagem",
  [NivelAcesso.ENFERMEIRO]: "Enfermeiro",
  [NivelAcesso.TECNICO]: "Técnico",
  [NivelAcesso.TI]: "TI",
};

export const sexoLabels = {
  [Sexo.M]: "Masculino",
  [Sexo.F]: "Feminino",
};

export const tipoCateterLabels = {
  [TipoCateter.Periferico]: "Periférico",
  [TipoCateter.Central]: "Central",
  [TipoCateter.PICC]: "PICC",
  [TipoCateter.Portocath]: "Portocath",
  [TipoCateter.Periferico_Longo]: "Periférico Longo",
  [TipoCateter.Sem_Acesso]: "Sem Acesso",
  [TipoCateter.Emergencia]: "Emergência",
  [TipoCateter.PowerPICC]: "PowerPICC",
};

export const identificacaoStatusLabels = {
  [IdentificacaoStatus.Identificada_via_Central]: "Identificada via Central",
  [IdentificacaoStatus.Identificado]: "Identificado",
  [IdentificacaoStatus.Nao_Identificado]: "Não Identificado",
};

export const condicaoLabels = {
  [CondicaoCateter.Em_Ordem]: "Em Ordem",
  [CondicaoCateter.Padronizar]: "Padronizar",
  [CondicaoCateter.Atencao]: "Atenção",
};

export const tipoEquipoLabels = {
  [TipoEquipo.Simples]: "Simples",
  [TipoEquipo.Bomba]: "Bomba",
};

export const turnoLabels = {
  [Turno.MANHA]: "Manhã",
  [Turno.TARDE]: "Tarde",
  [Turno.NOITE]: "Noite",
  [Turno.MADRUGADA]: "Madrugada",
};

export const situacaoLabels = {
  [Situacao.Manter]: "Manter",
  [Situacao.Atencao]: "Atenção",
  [Situacao.Vencido]: "Vencido",
  [Situacao.Removido]: "Removido",
};

export const modeloPeliculaLabels = {
  [ModeloPelicula.Pelicula_Fixa]: "Fixa",
  [ModeloPelicula.Pelicula_com_Gaze]: "Com Gaze",
  [ModeloPelicula.Recem_Aplicada]: "Recém Aplicada",
};
