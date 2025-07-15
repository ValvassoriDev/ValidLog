"use client";

import { Equipo } from "@prisma/client";
import { TableBase } from "@/components/tableBase";
import AuthGuard from "@/contexts/authGuard";
import { useFilteredFetch } from "@/hooks/useFilteredFetch";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { formatDate } from "@/utils/formatDate";
import { situacaoLabels } from "@/constants/labels";
import { getSituacaoColor } from "@/utils/getColors";

export default function ListarEquiposPagina() {
  const {
    data: equipos,
    error,
    loading,
  } = useFilteredFetch<Equipo[]>({ endpoint: "/api/equipos", cacheKey: "@safeline/equipos", useCache: true });

  const router = useRouter();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.equipos}>
      <TableBase
        title="Equipos Cadastrados"
        records={equipos ?? []}
        error={error}
        loading={loading}
        newRecordUrl="/equipos/formulario/cadastro"
        newRecordButtonText="Novo Equipo"
        onDetails={(id) => router.push(`/equipos/visualizar/${id}`)}
        columns={[
          { title: "Registro", field: "registroPaciente" },
          {
            title: "Tipo",
            customField: (r) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${r.tipo === "Simples"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
                  }`}
              >
                {r.tipo === "Simples" ? "Simples" : "Bomba"}
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
