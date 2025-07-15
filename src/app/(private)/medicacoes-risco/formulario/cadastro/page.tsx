"use client";

import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { MEDICACAO_RISCO_FIELDS } from "@/constants/formFields";
import { useCreateMedicacaoRisco } from "@/hooks/useCreateMedicacaoRisco";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function CadastrarMedicacaoRiscoPagina() {
  const { handleSubmit, submitError, router } = useCreateMedicacaoRisco();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.medicacoes_risco}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title="Cadastro de Medicação de Risco"
          //@ts-ignore
          fields={MEDICACAO_RISCO_FIELDS}
          //@ts-ignore
          onSubmit={handleSubmit}
          buttonText="Cadastrar Medicação"
          error={submitError || undefined}
          onSuccess={() => {
            setTimeout(() => router.push("/medicacoes-risco"));
          }}
        />
      </div>
    </AuthGuard>
  );
}
