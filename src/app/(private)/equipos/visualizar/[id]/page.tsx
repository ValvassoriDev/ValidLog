"use client";

import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { useShowEquipoId } from "@/hooks/useShowEquipoId";
import { EquipoCard } from "@/components/equipoCard";
import { PacienteCard } from "@/components/pacienteCard";
import { HospitalCard } from "@/components/hospitalCard";
import { Spinner } from "@/components/spinner";

export default function VisualizarEquipoPagina() {
  const { equipo, paciente, loading, loadingPaciente, getLabel, handleRemoveEquipo, isRemoving } = useShowEquipoId();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.equipos}>
      <div className="bg-background min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto bg-card shadow-lg p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-primary mb-4">Relatório do Equipo</h1>
          <div className="space-y-6">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <PacienteCard paciente={paciente} loading={loadingPaciente} />
                {equipo?.hospital && <HospitalCard hospital={equipo.hospital} loading={loading} />}
                {equipo ? (
                  <EquipoCard
                    equipo={equipo}
                    loading={loading}
                    getLabel={getLabel}
                    isRemoving={isRemoving}
                    handleRemoveEquipo={handleRemoveEquipo}
                  />
                ) : (
                  <div>Equipo não encontrado.</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
