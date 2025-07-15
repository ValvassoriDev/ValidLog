"use client";

import { Cateter } from "@prisma/client";
import { TableBase } from "@/components/tableBase";
import AuthGuard from "@/contexts/authGuard";
import { useFilteredFetch } from "@/hooks/useFilteredFetch";
import { useRouter } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { formatDate } from "@/utils/formatDate";
import {
  tipoCateterLabels,
  identificacaoStatusLabels,
  condicaoLabels,
  situacaoLabels,
} from "@/constants/labels";
import { getSituacaoColor } from "@/utils/getColors";

export default function ListarCateteresPagina() {
  const {
    data: catheters,
    error,
    loading,
  } = useFilteredFetch<Cateter[]>({ endpoint: "/api/cateteres", cacheKey: "@safeline/cateteres", useCache: true });

  const router = useRouter();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.cateteres}>
      <TableBase
        title="Cateteres Cadastrados"
        records={catheters ?? []}
        error={error}
        loading={loading}
        newRecordUrl="/cateteres/formulario/cadastro"
        newRecordButtonText="Novo Cateter"
        onDetails={(id) => router.push(`/cateteres/visualizar/${id}`)}
        columns={[
          { title: "Registro", field: "registroPaciente" },
          {
            title: "Tipo",
            customField: (r) => (
              <span
                className={`px-2 py-1 rounded-full text-xs ${r.tipoCateter === "Sem_Acesso"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
                  }`}
              >
                {tipoCateterLabels[r.tipoCateter as keyof typeof tipoCateterLabels]}
              </span>
            ),
          },
          {
            title: "Identificação",
            customField: (r) => identificacaoStatusLabels[r.identificacaoStatus as keyof typeof identificacaoStatusLabels],
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
                {condicaoLabels[r.condicao as keyof typeof condicaoLabels]}
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
