"use client";

import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { PELICULA_FIELDS } from "@/constants/formFields";
import { useCreatePelicula } from "@/hooks/useCreatePelicula";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function CadastrarPeliculaPagina() {
  const { handleSubmit, submitError, router } = useCreatePelicula();

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.peliculas}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title="Cadastro de Película"
          //@ts-ignore
          fields={PELICULA_FIELDS}
          //@ts-ignore
          onSubmit={handleSubmit}
          buttonText="Cadastrar Película"
          error={submitError || undefined}
          onSuccess={() => {
            setTimeout(() => router.push("/peliculas"));
          }}
        />
      </div>
    </AuthGuard>
  );
}
