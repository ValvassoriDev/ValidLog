"use client";

import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { EVOLUCAO_FIELDS } from "@/constants/formFields";
import { useCreateEvolucao } from "@/hooks/useCreateEvolucao";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function CadastrarEvolucaoPagina() {
  const { handleSubmit, submitError, router } = useCreateEvolucao();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.evolucoes}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title="Cadastro de Evolução"
          //@ts-ignore
          fields={EVOLUCAO_FIELDS}
          //@ts-ignore
          onSubmit={handleSubmit}
          buttonText="Cadastrar Evolução"
          error={submitError || undefined}
          onSuccess={() => {
            setTimeout(() => router.push("/evolucoes"));
          }}
        />
      </div>
    </AuthGuard>
  );
}
