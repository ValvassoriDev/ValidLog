"use client";

import { Pelicula } from "@prisma/client";
import { TableBase } from "@/components/tableBase";
import AuthGuard from "@/contexts/authGuard";
import { useFilteredFetch } from "@/hooks/useFilteredFetch";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { formatDate } from "@/utils/formatDate";
import { situacaoLabels, modeloPeliculaLabels } from "@/constants/labels";
import { getSituacaoColor } from "@/utils/getColors";

export default function ListarPeliculasPagina() {
  const {
    data: peliculas,
    error,
    loading,
    router
  } = useFilteredFetch<Pelicula[]>({ endpoint: "/api/peliculas", cacheKey: "@safeline/peliculas", useCache: false });

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.peliculas}>
      <TableBase
        title="Películas Cadastradas"
        records={peliculas ?? []}
        error={error}
        loading={loading}
        newRecordUrl="/peliculas/formulario/cadastro"
        newRecordButtonText="Nova Película"
        onDetails={(id) => router.push(`/peliculas/visualizar/${id}`)}
        columns={[
          { title: "Registro", field: "registroPaciente" },
          {
            title: "Modelo",
            customField: (r) => modeloPeliculaLabels[r.modeloPelicula as keyof typeof modeloPeliculaLabels],
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
          },
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
