"use client";

import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { PACIENTE_FIELDS } from "@/constants/formFields";
import { useCreatePaciente } from "@/hooks/useCreatePaciente";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function CadastrarPacientePagina() {
  const { handleSubmit, submitError, router } = useCreatePaciente();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.pacientes}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title="Cadastro de Paciente"
          //@ts-ignore
          fields={PACIENTE_FIELDS}
          //@ts-ignore
          onSubmit={handleSubmit}
          buttonText="Cadastrar Paciente"
          error={submitError || undefined}
          onSuccess={() => {
            setTimeout(() => router.push("/"));
          }}
        />
      </div>
    </AuthGuard>
  );
}
