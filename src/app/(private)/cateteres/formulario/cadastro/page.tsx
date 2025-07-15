"use client";

import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { CATETER_FIELDS } from "@/constants/formFields";
import { useCreateCateter } from "@/hooks/useCreateCateter";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function CadastrarCateterPagina() {
  const { handleSubmit, submitError, router } = useCreateCateter();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.cateteres}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title="Cadastro de Cateter"
          //@ts-ignore
          fields={CATETER_FIELDS}
          //@ts-ignore
          onSubmit={handleSubmit}
          buttonText="Cadastrar Cateter"
          error={submitError || undefined}
          onSuccess={() => {
            setTimeout(() => router.push("/cateteres"));
          }}
        />
      </div>
    </AuthGuard>
  );
}
