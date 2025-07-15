"use client";

import { Situacao } from "@prisma/client";
import { modeloPeliculaLabels, turnoLabels, situacaoLabels } from "@/constants/labels";
import { formatDate } from "@/utils/formatDate";
import { Spinner } from "@/components/spinner";
import { CustomButton } from "./Button/Button";

interface PeliculaCardProps {
  pelicula: any;
  loading: boolean;
  getLabel: (value: string, labels: any) => string;
  isRemoving: boolean;
  handleRemovePelicula: () => void;
}

export function PeliculaCard({ pelicula, loading, getLabel, isRemoving, handleRemovePelicula }: PeliculaCardProps) {
  const title = pelicula.situacao === Situacao.Removido ? "Pelicula Removida" : "Remover Película"


  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {loading || !pelicula ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-primary">Informações da Película</h2>
          <p><strong>ID:</strong> {pelicula.id}</p>
          <p><strong>Registro do Paciente:</strong> {pelicula.registroPaciente}</p>
          <p><strong>Modelo:</strong> {getLabel(pelicula.modeloPelicula, modeloPeliculaLabels)}</p>
          <p><strong>Turno:</strong> {getLabel(pelicula.turno, turnoLabels)}</p>
          <p><strong>Situação:</strong> {getLabel(pelicula.situacao, situacaoLabels)}</p>
          <p><strong>Data de Inserção:</strong> {formatDate(pelicula.dataInsercao)}</p>
          <p><strong>Data de Criação:</strong> {formatDate(pelicula.createdAt)}</p>
          <p><strong>Última Atualização:</strong> {formatDate(pelicula.updatedAt)}</p>

          <div className="flex justify-end mt-6">

            <CustomButton
              disabled={isRemoving || pelicula.situacao === Situacao.Removido}
              title={title}
              onClick={handleRemovePelicula}
            />
          </div>
        </>
      )}
    </div>
  );
}
