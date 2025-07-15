"use client";

import { MedicacaoRisco } from "@prisma/client";
import { TableBase } from "@/components/tableBase";
import AuthGuard from "@/contexts/authGuard";
import { useFilteredFetch } from "@/hooks/useFilteredFetch";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { formatDate } from "@/utils/formatDate";

export default function ListarMedicacoesRiscoPagina() {
  const {
    data: medicacoesRisco,
    error,
    loading,
    router
  } = useFilteredFetch<MedicacaoRisco[]>({ endpoint: "/api/medicacoes-risco", cacheKey: "@safeline/medicacoes-risco", useCache: true });

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.medicacoes_risco}>
      <TableBase
        title="Medições de Risco Cadastradas"
        records={medicacoesRisco ?? []}
        error={error}
        loading={loading}
        newRecordUrl="/medicacoes-risco/formulario/cadastro"
        newRecordButtonText="Nova Medicação de Risco"
        onDetails={(id) => router.push(`/medicacoes-risco/visualizar/${id}`)}
        columns={[
          { title: "Registro", field: "registroPaciente" },
          { title: "Medicação", field: "medicacao" },
          { title: "Duração (Horas)", field: "duracaoHoras" },
          {
            title: "Data de Inserção",
            customField: (r) => formatDate(r.dataInsercao),
          },
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
          }
        ]}
      />
    </AuthGuard>
  );
}
