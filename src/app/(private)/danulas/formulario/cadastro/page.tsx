"use client";

import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { DANULA_FIELDS } from "@/constants/formFields";
import { useCreateDanula } from "@/hooks/useCreateDanula";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function CadastrarDanulaPagina() {
  const { handleSubmit, submitError, router } = useCreateDanula();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.danulas}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title="Cadastro de Dânula"
          //@ts-ignore
          fields={DANULA_FIELDS}
          //@ts-ignore
          onSubmit={handleSubmit}
          buttonText="Cadastrar Dânula"
          error={submitError || undefined}
          onSuccess={() => {
            setTimeout(() => router.push("/danulas"));
          }}
        />
      </div>
    </AuthGuard>
  );
}
