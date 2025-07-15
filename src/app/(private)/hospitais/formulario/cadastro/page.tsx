"use client";

import { useRouter } from "next/navigation";
import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { useState } from "react";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { toast } from "sonner";
interface FormField {
  id: string;
  label: string;
  required: boolean;
  tipo: string;
}

const BASE_FIELDS: FormField[] = [
  {
    id: "nome",
    label: "Nome do Hospital",
    required: true,
    tipo: "text"
  },
  {
    id: "cnpj",
    label: "CNPJ",
    required: false,
    tipo: "text"
  },
  {
    id: "zipCode",
    label: "CEP",
    required: false,
    tipo: "text"
  },
  {
    id: "endereco",
    label: "Endereço",
    required: false,
    tipo: "text"
  },
  {
    id: "state",
    label: "Estado",
    required: false,
    tipo: "text"
  },

  {
    id: "city",
    label: "Cidade",
    required: false,
    tipo: "text"
  },
  {
    id: "phone",
    label: "Telefone",
    required: false,
    tipo: "text"
  },
  {
    id: "email",
    label: "E-mail",
    required: false,
    tipo: "text"
  },

];

export default function CreateHospitalPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (formData: Record<string, string>) => {
    setSubmitError(null);

    try {
      const response = await fetch('/api/hospitais', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          endereco: formData.endereco || null,
          cnpj: formData.cnpj,
          zipCode: formData.zipCode,
          state: formData.state,
          city: formData.city,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar hospital');
      }

      toast.success("Hospital cadastrado com sucesso");
      return true;
    } catch (error) {
      console.error('Erro:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao cadastrar hospital';
      setSubmitError(errorMessage);
      throw error;
    }
  };

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.hospitais}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title="Cadastro de Hospital"
          fields={BASE_FIELDS}
          onSubmit={handleSubmit}
          buttonText="Cadastrar Hospital"
          error={submitError || undefined}
          onSuccess={() => {
            setTimeout(() => router.push("/hospitais"));
          }}
        />
      </div>
    </AuthGuard>
  );
}
