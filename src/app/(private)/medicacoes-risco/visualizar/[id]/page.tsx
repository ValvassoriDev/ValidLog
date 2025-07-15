"use client";

import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { useShowMedicacaoRiscoId } from "@/hooks/useShowMedicacaoRiscoId";
import { MedicacaoRiscoCard } from "@/components/medicacaoRiscoCard";
import { PacienteCard } from "@/components/pacienteCard";
import { HospitalCard } from "@/components/hospitalCard";
import { Spinner } from "@/components/spinner";

export default function VisualizarMedicacaoRiscoPagina() {
  const {
    medicacaoRisco,
    paciente,
    hospital,
    loading,
    loadingPaciente,
    loadingHospital,
    handleRemoveMedicacaoRisco,
    isRemoving,
    getLabel,
  } = useShowMedicacaoRiscoId();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.medicacoes_risco}>
      <div className="bg-background min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-card shadow-lg p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-primary mb-4">Relatório da Medicação de Risco</h1>
          <div className="space-y-6">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <PacienteCard paciente={paciente} loading={loadingPaciente} />
                {hospital && <HospitalCard hospital={hospital} loading={loadingHospital} />}
                {medicacaoRisco ? (
                  <MedicacaoRiscoCard
                    medicacaoRisco={medicacaoRisco}
                    loading={loading}
                    getLabel={getLabel}
                    isRemoving={isRemoving}
                    handleRemoveMedicacaoRisco={handleRemoveMedicacaoRisco}
                  />
                ) : (
                  <div>Medicação de risco não encontrada.</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
