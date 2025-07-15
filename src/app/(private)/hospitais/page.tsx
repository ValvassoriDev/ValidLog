"use client";

import { NivelAcesso } from "@prisma/client";
import { TableBase } from "@/components/tableBase";
import AuthGuard from "@/contexts/authGuard";
import { useFetchHospitals } from "@/hooks/useFetchHospitals";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function HospitalList() {
  const { loading, hospitals, error } = useFetchHospitals()

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.hospitais}>
      <TableBase
        title="Hospitais Cadastrados"
        records={hospitals || []}
        columns={[
          { title: "Nome", field: "nome" },
          { title: "Endereço", field: "endereco" },
        ]}
        newRecordUrl="/hospitais/formulario/cadastro"
        newRecordButtonText="Novo Hospital"
        loading={loading}
        error={error}
      />
    </AuthGuard>
  );
}
