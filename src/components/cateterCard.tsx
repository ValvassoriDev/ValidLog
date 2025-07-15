"use client";

import { Situacao } from "@prisma/client";
import { tipoCateterLabels, identificacaoStatusLabels, condicaoLabels, turnoLabels, situacaoLabels } from "@/constants/labels";
import { formatDate } from "@/utils/formatDate";
import { Spinner } from "@/components/spinner";
import { CustomButton } from "./Button/Button";

interface CateterCardProps {
  cateter: any;
  loading: boolean;
  getLabel: (value: string, labels: any) => string;
  isRemoving: boolean;
  handleRemoveCateter: () => void;
}

export function CateterCard({ cateter, loading, getLabel, isRemoving, handleRemoveCateter }: CateterCardProps) {

  const title = cateter.situacao === Situacao.Removido ? "Cateter Removido" : "Remover Cateter"

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {loading || !cateter ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-blue-800">Informações do Cateter</h2>
          <p><strong>ID:</strong> {cateter.id}</p>
          <p><strong>Registro do Paciente:</strong> {cateter.registroPaciente}</p>
          <p><strong>Tipo:</strong> {getLabel(cateter.tipoCateter, tipoCateterLabels)}</p>
          <p><strong>Status de Identificação:</strong> {getLabel(cateter.identificacaoStatus, identificacaoStatusLabels)}</p>
          <p><strong>Condição:</strong> {getLabel(cateter.condicao, condicaoLabels)}</p>
          <p><strong>Turno:</strong> {getLabel(cateter.turno, turnoLabels)}</p>
          <p><strong>Situação:</strong> {getLabel(cateter.situacao, situacaoLabels)}</p>
          <p><strong>Data de Inserção:</strong> {formatDate(cateter.dataInsercao)}</p>
          <p><strong>Data de Criação:</strong> {formatDate(cateter.createdAt)}</p>
          <p><strong>Última Atualização:</strong> {formatDate(cateter.updatedAt)}</p>

          <div className="flex justify-end mt-6">
            <CustomButton
              disabled={isRemoving || cateter.situacao === Situacao.Removido}
              title={title}
              onClick={handleRemoveCateter}
            />
          </div>
        </>
      )}
    </div>
  );
}
