import { Turno, Situacao } from "@prisma/client";

export const REGISTRO_PACIENTE_FIELD = {
  id: "registroPaciente",
  label: "Registro do Paciente",
  required: true,
  type: "text",
};

export const REGISTRO_PACIENTE_FIELD_READONLY = {
  id: "registroPaciente",
  label: "Registro do Paciente",
  required: true,
  type: "text",
  readonly: true
};

export const TURNO_FIELD = {
  id: "turno",
  label: "Turno",
  required: true,
  type: "select",
  options: [
    { value: Turno.MANHA, label: "Manhã" },
    { value: Turno.TARDE, label: "Tarde" },
    { value: Turno.NOITE, label: "Noite" },
    { value: Turno.MADRUGADA, label: "Madrugada" },
  ],
};

export const SITUACAO_FIELD = {
  id: "situacao",
  label: "Situação",
  required: true,
  type: "select",
  options: [
    { value: Situacao.Manter, label: "Manter" },
    { value: Situacao.Atencao, label: "Atenção" },
  ],
};

export const DATA_INSERCAO_FIELD = {
  id: "dataInsercao",
  label: "Data de Inserção",
  required: false,
  type: "datetime-local",
};
