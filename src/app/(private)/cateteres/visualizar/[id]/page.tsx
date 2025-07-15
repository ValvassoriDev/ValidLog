"use client";

import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { useShowCateterId } from "@/hooks/useShowCateterId";
import { CateterCard } from "@/components/cateterCard";
import { PacienteCard } from "@/components/pacienteCard";
import { HospitalCard } from "@/components/hospitalCard";

export default function VisualizarCateterPagina() {
  const { cateter, paciente, loading, loadingPaciente, getLabel, handleRemoveCateter, isRemoving } = useShowCateterId();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.cateteres}>
      <div className="bg-background min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-card shadow-lg p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Relatório do Cateter</h1>
          <div className="space-y-6">
            <PacienteCard paciente={paciente} loading={loadingPaciente} />
            {cateter?.hospital && <HospitalCard hospital={cateter.hospital} loading={loading} />}
            {cateter ? (
              <CateterCard
                cateter={cateter}
                loading={loading}
                getLabel={getLabel}
                isRemoving={isRemoving}
                handleRemoveCateter={handleRemoveCateter}
              />
            ) : (
              <div>Cateter não encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
