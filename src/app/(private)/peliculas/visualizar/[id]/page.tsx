"use client";

import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { useShowPeliculaId } from "@/hooks/useShowPeliculaId";
import { PeliculaCard } from "@/components/peliculaCard";
import { PacienteCard } from "@/components/pacienteCard";
import { HospitalCard } from "@/components/hospitalCard";
import { Spinner } from "@/components/spinner";

export default function VisualizarPeliculaPagina() {
  const { pelicula, paciente, loading, loadingPaciente, getLabel, handleRemovePelicula, isRemoving } = useShowPeliculaId();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.peliculas}>
      <div className="bg-background min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-card shadow-lg p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-primary mb-4">Relatório do Películas</h1>
          <div className="space-y-6">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <PacienteCard paciente={paciente} loading={loadingPaciente} />
                {pelicula?.hospital && <HospitalCard hospital={pelicula.hospital} loading={loading} />}
                {pelicula ? (
                  <PeliculaCard
                    pelicula={pelicula}
                    loading={loading}
                    getLabel={getLabel}
                    isRemoving={isRemoving}
                    handleRemovePelicula={handleRemovePelicula}
                  />
                ) : (
                  <div>Película não encontrada.</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
