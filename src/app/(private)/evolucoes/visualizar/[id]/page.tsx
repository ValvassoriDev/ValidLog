"use client";

import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { useShowEvolucaoId } from "@/hooks/useShowEvolucaoId";
import { EvolucaoCard } from "@/components/evolucaoCard";
import { PacienteCard } from "@/components/pacienteCard";
import { HospitalCard } from "@/components/hospitalCard";
import { Spinner } from "@/components/spinner";

export default function VisualizarEvolucaoPagina() {
  const { evolucao, paciente, loading, loadingPaciente, getLabel } = useShowEvolucaoId();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.evolucoes}>
      <div className="bg-background min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-card shadow-lg p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-primary mb-4">Relatório da Evolução</h1>
          <div className="space-y-6">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <PacienteCard paciente={paciente} loading={loadingPaciente} />
                {evolucao?.hospital && <HospitalCard hospital={evolucao.hospital} loading={loading} />}
                {evolucao ? (
                  <EvolucaoCard
                    evolucao={evolucao}
                    loading={loading}
                    getLabel={getLabel}
                  />
                ) : (
                  <div>Evolução não encontrada.</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
