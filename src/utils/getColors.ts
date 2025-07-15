import { Situacao, Status, TipoSanguineo, TipoCateter } from "@prisma/client";

export const getStatusColor = (status: string) => {
  switch (status) {
    case Status.Internado:
      return "bg-blue-100 text-blue-800";
    case Status.Ativo:
      return "bg-green-100 text-green-800";
    case Status.Suspenso:
      return "bg-yellow-100 text-yellow-800";
    case Status.Alta_dos_Atendimentos:
      return "bg-purple-100 text-purple-800";
    case Status.Obito:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getSituacaoColor = (situacao: string) => {
  switch (situacao) {
    case Situacao.Manter:
      return "bg-green-100 text-green-800";
    case Situacao.Atencao:
      return "bg-yellow-100 text-yellow-800";
    case Situacao.Vencido:
      return "bg-orange-100 text-orange-800";
    case Situacao.Removido:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getTipoCateterColor = (tipo?: string) => {
  switch (tipo) {
    case TipoCateter.Periferico:
      return "bg-orange-100 text-orange-800";
    case TipoCateter.Central:
      return "bg-sky-100 text-sky-800";
    case TipoCateter.PICC:
      return "bg-purple-100 text-purple-800";
    case TipoCateter.Portocath:
      return "bg-yellow-900 text-yellow-100";
    case TipoCateter.Periferico_Longo:
      return "bg-violet-100 text-violet-800";
    case TipoCateter.Sem_Acesso:
      return "bg-gray-100 text-gray-800";
    case TipoCateter.Emergencia:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};


export const getTipoSanguineoColor = (tipo: string) => {
  const baseStyle = "font-bold";
  switch (tipo) {
    case TipoSanguineo.A_Pos:
      return `${baseStyle} text-red-600`;
    case TipoSanguineo.A_Neg:
      return `${baseStyle} text-red-400`;
    case TipoSanguineo.B_Pos:
      return `${baseStyle} text-blue-600`;
    case TipoSanguineo.B_Neg:
      return `${baseStyle} text-blue-400`;
    case TipoSanguineo.AB_Pos:
      return `${baseStyle} text-purple-600`;
    case TipoSanguineo.AB_Neg:
      return `${baseStyle} text-purple-400`;
    case TipoSanguineo.O_Pos:
      return `${baseStyle} text-green-600`;
    case TipoSanguineo.O_Neg:
      return `${baseStyle} text-green-400`;
    default:
      return baseStyle;
  }
};
