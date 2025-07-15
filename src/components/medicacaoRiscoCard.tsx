"use client";

import { Situacao } from "@prisma/client";
import { turnoLabels, situacaoLabels } from "@/constants/labels";
import { formatDate } from "@/utils/formatDate";
import { Spinner } from "@/components/spinner";
import { CustomButton } from "./Button/Button";

interface MedicacaoRiscoCardProps {
  medicacaoRisco: any;
  loading: boolean;
  getLabel: (value: string, labels: any) => string;
  isRemoving: boolean;
  handleRemoveMedicacaoRisco: () => void;
}

export function MedicacaoRiscoCard({
  medicacaoRisco,
  loading,
  getLabel,
  isRemoving,
  handleRemoveMedicacaoRisco,
}: MedicacaoRiscoCardProps) {
  const title = medicacaoRisco.situacao === Situacao.Removido ? "Medicação Removida" : "Remover Medicação de Risco"

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {loading || !medicacaoRisco ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-primary">Informações da Medicação de Risco</h2>
          <p><strong>ID:</strong> {medicacaoRisco.id}</p>
          <p><strong>Registro do Paciente:</strong> {medicacaoRisco.registroPaciente}</p>
          <p><strong>Medicação:</strong> {medicacaoRisco.medicacao}</p>
          <p><strong>Turno:</strong> {getLabel(medicacaoRisco.turno, turnoLabels)}</p>
          <p><strong>Situação:</strong> {getLabel(medicacaoRisco.situacao, situacaoLabels)}</p>
          <p><strong>Data de Inserção:</strong> {formatDate(medicacaoRisco.dataInsercao)}</p>
          <p><strong>Data de Criação:</strong> {formatDate(medicacaoRisco.createdAt)}</p>
          <p><strong>Última Atualização:</strong> {formatDate(medicacaoRisco.updatedAt)}</p>

          <div className="flex justify-end mt-6">
            <CustomButton
              disabled={isRemoving || medicacaoRisco.situacao === Situacao.Removido}
              title={title}
              onClick={handleRemoveMedicacaoRisco}
            />
          </div>
        </>
      )}
    </div>
  );
}
