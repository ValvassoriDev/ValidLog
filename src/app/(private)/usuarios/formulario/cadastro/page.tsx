"use client";

import { useRouter } from "next/navigation";
import { NivelAcesso } from "@prisma/client";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/userContext";
import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { useFetchHospitals } from "@/hooks/useFetchHospitals";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

interface FormField {
  id: string;
  label: string;
  required: boolean;
  type: "text" | "number" | "email" | "password" | "select" | "search-select" | "textarea";
  options?: { value: string; label: string }[];
}

const BASE_FIELDS: FormField[] = [
  {
    id: "nomeCompleto",
    label: "Nome Completo",
    required: true,
    type: "text",
  },
  { id: "matricula", label: "Matrícula", required: true, type: "text" },
  { id: "senha", label: "Senha", required: true, type: "password" },
  {
    id: "confirmSenha",
    label: "Confirmar Senha",
    required: true,
    type: "password",
  },
  { id: "phone", label: "Telefone", required: false, type: "text" },
  { id: "email", label: "E-mail", required: false, type: "email" },
];

const ACCESS_LEVEL_OPTIONS = [
  { value: "ENFERMEIRO", label: "Enfermeiro" },
  { value: "TECNICO", label: "Técnico de Enfermagem" },
  { value: "COORDENADOR_ENFERMAGEM", label: "Coordenador de Enfermagem" },
  { value: "SUPERVISOR_ENFERMAGEM", label: "Supervisor de Enfermagem" },
];

export default function CreateUserPage() {
  const router = useRouter();
  const { userData, loading: userLoading, error: userError, refetchUser } = useUser();
  const { hospitals, loading: loadingHospitals, error: hospitalsError } = useFetchHospitals();

  const [fields, setFields] = useState<FormField[]>(BASE_FIELDS);
  const shouldFetchHospitals = userData?.nivelAcesso === "TI";

  useEffect(() => {
    const updatedFields = [...BASE_FIELDS];

    if (userData?.nivelAcesso) {
      updatedFields.push({
        id: "nivelAcesso",
        label: "Nível de Acesso",
        required: true,
        type: "select",
        options: ACCESS_LEVEL_OPTIONS,
      });

      if (shouldFetchHospitals && hospitals && hospitals.length > 0) {
        updatedFields.push({
          id: "hospitalId",
          label: "Hospital",
          required: true,
          type: "select",
          options: hospitals.map((hospital) => ({
            value: hospital.id,
            label: hospital.nome,
          })),
        });
      }
    }

    setFields(updatedFields);
  }, [userData, hospitals, shouldFetchHospitals]);

  const handleSubmit = async (formData: Record<string, string>) => {
    if (formData.senha !== formData.confirmSenha) {
      throw new Error("As senhas não coincidem.");
    }


    const body = {
      nomeCompleto: formData.nomeCompleto,
      matricula: formData.matricula,
      senha: formData.senha,
      email: formData.email,
      phone: formData.phone,
      nivelAcesso: formData.nivelAcesso as NivelAcesso,
      ...(formData.hospitalId && { hospitalId: formData.hospitalId }),
    };


    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      return true;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      throw new Error(error instanceof Error ? error.message : "Erro ao cadastrar usuário");
    }
  };

  const isLoading = userLoading || (shouldFetchHospitals && loadingHospitals);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hospitalsError || userError) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Erro ao carregar</p>
          <p>{hospitalsError?.toString() || userError?.toString()}</p>
          <button
            onClick={() => {
              if (userError) refetchUser();
              else window.location.reload();
            }}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (shouldFetchHospitals && (!hospitals || hospitals.length === 0)) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div
          className="bg-red-50 border-l-4 border-red-600 text-white p-4 rounded-lg shadow-lg"
          role="alert"
        >
          <p className="font-semibold text-lg">Nenhum Hospital Encontrado</p>
          <p className="mt-2">
            Atualmente, não há hospitais disponíveis para seleção. Por favor,
            tente novamente mais tarde.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.usuarios}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title={`Cadastro de Usuário ${userData?.nivelAcesso === NivelAcesso.TI ? "em Nível TI" : ""}`}
          fields={fields}
          onSubmit={handleSubmit}
          buttonText="Cadastrar Usuário"
          error={hospitalsError?.toString() || userError?.toString()}
          onSuccess={() => {
            setTimeout(() => router.push("/usuarios"));
          }}
        />
      </div>
    </AuthGuard>
  );
}
