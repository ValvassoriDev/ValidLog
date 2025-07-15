export const formatNivelAcesso = (nivel: string) => {
  if (!nivel) {
    return "Nível desconhecido";
  }

  return nivel
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
