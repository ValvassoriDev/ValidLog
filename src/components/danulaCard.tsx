"use client";

import { Situacao } from "@prisma/client";
import { turnoLabels, situacaoLabels } from "@/constants/labels";
import { formatDate } from "@/utils/formatDate";
import { Spinner } from "@/components/spinner";
import { CustomButton } from "./Button/Button";

interface DanulaCardProps {
  danula: any;
  loading: boolean;
  getLabel: (value: string, labels: any) => string;
  isRemoving: boolean;
  handleRemoveDanula: () => void;
}

export function DanulaCard({ danula, loading, getLabel, isRemoving, handleRemoveDanula }: DanulaCardProps) {

  const title = danula.situacao === Situacao.Removido ? "Danula Removida" : "Remover Danula"

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {loading || !danula ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-blue-800">Informações da Danula</h2>
          <p><strong>ID:</strong> {danula.id}</p>
          <p><strong>Registro do Paciente:</strong> {danula.registroPaciente}</p>
          <p><strong>Turno:</strong> {getLabel(danula.turno, turnoLabels)}</p>
          <p><strong>Situação:</strong> {getLabel(danula.situacao, situacaoLabels)}</p>
          <p><strong>Data de Inserção:</strong> {formatDate(danula.dataInsercao)}</p>
          <p><strong>Data de Criação:</strong> {formatDate(danula.createdAt)}</p>
          <p><strong>Última Atualização:</strong> {formatDate(danula.updatedAt)}</p>

          <div className="flex justify-end mt-6">
            <CustomButton
              disabled={isRemoving || danula.situacao === Situacao.Removido}
              title={title}
              onClick={handleRemoveDanula}
            />
          </div>
        </>
      )}
    </div>
  );
}
