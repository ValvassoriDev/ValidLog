"use client";

import { Evolucao } from "@prisma/client";
import { turnoLabels } from "@/constants/labels";
import { formatDate } from "@/utils/formatDate";
import { Spinner } from "@/components/spinner";

interface EvolucaoCardProps {
  evolucao: Evolucao | null;
  loading: boolean;
  getLabel: (value: string, labels: Record<string, string>) => string;
}

export function EvolucaoCard({
  evolucao,
  loading,
  getLabel,
}: EvolucaoCardProps) {
  if (loading || !evolucao) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  const renderField = (label: string, value: React.ReactNode) => (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-primary">Informações da Evolução</h2>
      {renderField("ID", evolucao.id)}
      {renderField("Registro do Paciente", evolucao.registroPaciente)}
      {renderField("Turno", getLabel(evolucao.turno, turnoLabels))}
      {renderField("Data da Evolução", formatDate(evolucao.dataEvolucao))}
      {renderField("Profissional", evolucao.profissional)}
      {renderField("Anotação", evolucao.anotacao)}
      {renderField("Data de Criação", formatDate(evolucao.createdAt))}
      {renderField("Última Atualização", formatDate(evolucao.updatedAt))}
    </div>
  );
}
