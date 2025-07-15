"use client";

import { Evolucao } from "@prisma/client";
import { TableBase } from "@/components/tableBase";
import AuthGuard from "@/contexts/authGuard";
import { useFilteredFetch } from "@/hooks/useFilteredFetch";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { formatDate } from "@/utils/formatDate";

export default function ListarEvolucoesPagina() {
  const {
    data: evolucoes,
    error,
    loading,
    router,
  } = useFilteredFetch<Evolucao[]>({ endpoint: "/api/evolucoes", cacheKey: "@safeline/evolucoes", useCache: true });

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.evolucoes}>
      <TableBase
        title="Evoluções Cadastradas"
        records={evolucoes ?? []}
        error={error}
        loading={loading}
        newRecordUrl="/evolucoes/formulario/cadastro"
        newRecordButtonText="Nova Evolução"
        onDetails={(id) => router.push(`/evolucoes/visualizar/${id}`)}
        columns={[
          { title: "Registro", field: "registroPaciente" },
          {
            title: "Turno",
            customField: (r) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${r.turno === "MANHA"
                    ? "bg-blue-100 text-blue-800"
                    : r.turno === "TARDE"
                    ? "bg-yellow-100 text-yellow-800"
                    : r.turno === "NOITE"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                  }`}
              >
                {r.turno}
              </span>
            ),
          },
          { title: "Profissional", field: "profissional" },
          {
            title: "Data da Evolução",
            customField: (r) => formatDate(r.dataEvolucao),
          },
        ]}
      />
    </AuthGuard>
  );
}
