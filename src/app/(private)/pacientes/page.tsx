"use client";

import { TableBase } from "@/components/tableBase";
import { useRouter } from "next/navigation";
import { useFilteredFetch } from "@/hooks/useFilteredFetch";
import AuthGuard from "@/contexts/authGuard";
import { Paciente, Status } from "@prisma/client";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function PacientesList() {
  const router = useRouter();
  const {
    data: patients,
    loading,
    error,
  } = useFilteredFetch<Paciente[]>({ endpoint: "/api/pacientes", cacheKey: "@safeline/pacientes", useCache: true });

  const getSexLabel = (sex: string): string => {
    switch (sex) {
      case "M":
        return "Masculino";
      case "F":
        return "Feminino";
      default:
        return "Outro";
    }
  };

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.pacientes}>
      <div className="bg-background min-h-screen py-8">
        <TableBase
          title="Pacientes Cadastrados"
          records={patients || []}
          columns={[
            { title: "Nome Completo", field: "nomeCompleto" },
            { title: "Nome Abreviado", field: "abreviacaoNome" },
            {
              title: "Sexo",
              customField: (r) => getSexLabel(r.sexo),
            },
            {
              title: "Status",
              customField: (r) => (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(r.status as Status)}`}
                >
                  {r.status.replaceAll("_", " ")}
                </span>
              ),
            },
          ]}
          newRecordUrl="/pacientes/formulario/cadastro"
          newRecordButtonText="Novo Motorista"
          onDetails={(id) => router.push(`/pacientes/visualizar/${id}`)}
          loading={loading}
          error={error}
        />
      </div>
    </AuthGuard>
  );
}
