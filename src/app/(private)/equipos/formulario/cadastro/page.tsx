"use client";

import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { EQUIPO_FIELDS } from "@/constants/formFields";
import { useCreateEquipo } from "@/hooks/useCreateEquipo";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function CadastrarEquipoPagina() {
  const { handleSubmit, submitError, router } = useCreateEquipo();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.equipos}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title="Cadastro de Equipo"
          //@ts-ignore
          fields={EQUIPO_FIELDS}
          //@ts-ignore
          onSubmit={handleSubmit}
          buttonText="Cadastrar Equipo"
          error={submitError || undefined}
          onSuccess={() => {
            setTimeout(() => router.push("/equipos"));
          }}
        />
      </div>
    </AuthGuard>
  );
}
