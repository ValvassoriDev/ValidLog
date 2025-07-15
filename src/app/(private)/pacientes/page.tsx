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

  const getStatusStyle = (status: Status) => {
    switch (status) {
      case "Alta":
        return "bg-green-100 text-green-800";
      case "Internado":
        return "bg-yellow-100 text-yellow-800";
      case "Transferido":
        return "bg-orange-100 text-orange-800";
      case "Obito":
        return "bg-gray-300 text-gray-800 line-through";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.pacientes}>
      <div className="bg-background min-h-screen py-8">
        <TableBase
          title="Pacientes Cadastrados"
          records={patients || []}
          columns={[
            { title: "Registro", field: "registroPaciente" },
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
          newRecordButtonText="Novo Paciente"
          onDetails={(id) => router.push(`/pacientes/visualizar/${id}`)}
          loading={loading}
          error={error}
        />
      </div>
    </AuthGuard>
  );
}
