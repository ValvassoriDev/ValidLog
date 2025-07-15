"use client";

import { Situacao } from "@prisma/client";
import { tipoEquipoLabels, turnoLabels, situacaoLabels } from "@/constants/labels";
import { formatDate } from "@/utils/formatDate";
import { Spinner } from "@/components/spinner";
import { CustomButton } from "./Button/Button";

interface EquipoCardProps {
  equipo: any;
  loading: boolean;
  getLabel: (value: string, labels: any) => string;
  isRemoving: boolean;
  handleRemoveEquipo: () => void;
}

export function EquipoCard({ equipo, loading, getLabel, isRemoving, handleRemoveEquipo }: EquipoCardProps) {
  const title = equipo.situacao === Situacao.Removido ? "Equipo Removido" : "Remover Equipo"

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {loading || !equipo ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-primary">Informações do Equipo</h2>
          <p><strong>ID:</strong> {equipo.id}</p>
          <p><strong>Registro do Paciente:</strong> {equipo.registroPaciente}</p>
          <p><strong>Tipo:</strong> {getLabel(equipo.tipo, tipoEquipoLabels)}</p>
          <p><strong>Turno:</strong> {getLabel(equipo.turno, turnoLabels)}</p>
          <p><strong>Situação:</strong> {getLabel(equipo.situacao, situacaoLabels)}</p>
          <p><strong>Data de Inserção:</strong> {formatDate(equipo.dataInsercao)}</p>
          <p><strong>Data de Criação:</strong> {formatDate(equipo.createdAt)}</p>
          <p><strong>Última Atualização:</strong> {formatDate(equipo.updatedAt)}</p>

          <div className="flex justify-end mt-6">
            <CustomButton
              disabled={isRemoving || equipo.situacao === Situacao.Removido}
              title={title}
              onClick={handleRemoveEquipo}
            />
          </div>
        </>
      )}
    </div>
  );
}
