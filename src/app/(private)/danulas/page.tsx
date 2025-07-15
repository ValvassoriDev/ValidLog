"use client";

import { Danula } from "@prisma/client";
import { TableBase } from "@/components/tableBase";
import AuthGuard from "@/contexts/authGuard";
import { useFilteredFetch } from "@/hooks/useFilteredFetch";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { formatDate } from "@/utils/formatDate";
import { situacaoLabels, turnoLabels } from "@/constants/labels";
import { getSituacaoColor } from "@/utils/getColors";

export default function ListarDanulasPagina() {
  const {
    data: danulas,
    error,
    loading,
  } = useFilteredFetch<Danula[]>({ endpoint: "/api/danulas", cacheKey: "@safeline/danulas", useCache: true });

  const router = useRouter();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.danulas}>
      <TableBase
        title="Danulas Cadastradas"
        records={danulas ?? []}
        error={error}
        loading={loading}
        newRecordUrl="/danulas/formulario/cadastro"
        newRecordButtonText="Nova Danula"
        onDetails={(id) => router.push(`/danulas/visualizar/${id}`)}
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
                      : "bg-gray-100 text-gray-800"
                  }`}
              >
                {turnoLabels[r.turno as keyof typeof turnoLabels]}
              </span>
            ),
          },
          {
            title: "Condição",
            customField: (r) => (
              <span
                className={`inline-flex items-center gap-1 ${r.condicao === "Em_Ordem"
                  ? "text-green-600"
                  : r.condicao === "Atencao"
                    ? "text-yellow-600"
                    : "text-gray-600"
                  }`}
              >
                {r.condicao === "Atencao" && (
                  <ExclamationTriangleIcon className="h-4 w-4" />
                )}
                {r.condicao === "Atencao" && "Atenção"}
              </span>
            ),
          },
          { title: "Paciente", field: ["paciente", "nomeCompleto"] },
          { title: "Hospital", field: ["hospital", "nome"] },
          {
            title: "Data de Inserção",
            customField: (r) => formatDate(r.dataInsercao),
          },
          {
            title: "Situação",
            customField: (r) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${getSituacaoColor(r.situacao)}`}
              >
                {situacaoLabels[r.situacao as keyof typeof situacaoLabels]}
              </span>
            ),
          },

        ]}
      />
    </AuthGuard>
  );
}
