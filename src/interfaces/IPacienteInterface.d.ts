export interface IPacienteInterface {
  id: string;
  registroPaciente: string;
  nomeCompleto: string;
  abreviacaoNome: string;
  roomNumber: string;
  hospital: {
    nome: string;
    endereco: string;
  };
  cateteres: Array<{
    id: string;
    tipoCateter: string;
    identificacaoStatus: string;
    condicao: string;
    turno: string;
    situacao: string;
    dataInsercao: string;
  }>;
  peliculas: Array<{
    id: string;
    modeloPelicula: string;
    turno: string;
    situacao: string;
    dataInsercao: string;
  }>;
  medicacoesRisco: Array<{
    id: string;
    medicacao: string;
    duracaoHoras: number;
    dataInsercao: string;
    turno: string;
    situacao: string;
    expireIn: string;
  }>;
  evolucoes: Array<{
    id: string;
    anotacao: string;
    profissional: string;
    turno: string;
    dataEvolucao: string;
  }>;
  equipos: Array<{
    id: string;
    tipo: string;
    turno: string;
    situacao: string;
    dataInsercao: string;
  }>;
  danulas: Array<{
    id: string;
    turno: string;
    situacao: string;
    dataInsercao: string;
  }>;
}
