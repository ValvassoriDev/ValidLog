"use client";

import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { useShowDanulaId } from "@/hooks/useShowDanulaId";
import { DanulaCard } from "@/components/danulaCard";
import { PacienteCard } from "@/components/pacienteCard";
import { HospitalCard } from "@/components/hospitalCard";
import { Spinner } from "@/components/spinner";

export default function VisualizarDanulaPagina() {
  const { danula, paciente, loading, loadingPaciente, getLabel, handleRemoveDanula, isRemoving } = useShowDanulaId();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.danulas}>
      <div className="bg-background min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-card shadow-lg p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Relatório da Danula</h1>
          <div className="space-y-6">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <PacienteCard paciente={paciente} loading={loadingPaciente} />
                {danula?.hospital && <HospitalCard hospital={danula.hospital} loading={loading} />}
                {danula ? (
                  <DanulaCard
                    danula={danula}
                    loading={loading}
                    getLabel={getLabel}
                    isRemoving={isRemoving}
                    handleRemoveDanula={handleRemoveDanula}
                  />
                ) : (
                  <div>Danula não encontrada.</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
