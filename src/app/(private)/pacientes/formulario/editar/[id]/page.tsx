"use client";

import { useShowPacienteId } from "@/hooks/useShowPacienteId";
import { Sexo, Status } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FormBase } from "@/components/formBase";
import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { Spinner } from "@/components/spinner";
import { toast } from "sonner";

export default function EditarPacientePagina() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { paciente, loading } = useShowPacienteId();
  const [formError, setFormError] = useState("");

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      const response = await fetch(`/api/pacientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao atualizar o paciente");
      }

      toast.success("Paciente atualizado com sucesso.");
      return true;
    } catch (err: any) {
      console.error("Erro ao atualizar paciente:", err);
      setFormError(err.message || "Erro ao atualizar o paciente");
      return false;
    }
  };

  const campos = [
    {
      id: "registroPaciente",
      label: "Registro do Paciente",
      required: true,
      type: "text",
      readonly: true
    },
    {
      id: "nomeCompleto",
      label: "Nome Completo",
      required: true,
      type: "text",
    },
    {
      id: "abreviacaoNome",
      label: "Nome Abreviado",
      required: false,
      type: "text",
    },

    {
      id: "sexo",
      label: "Sexo",
      required: true,
      type: "select",
      options: [
        { value: Sexo.M, label: "Masculino" },
        { value: Sexo.F, label: "Feminino" },
      ],
    },

    {
      id: "status",
      label: "Status",
      type: "select",
      required: true,
      options: Object.keys(Status).map((key) => ({
        value: Status[key as keyof typeof Status],
        label: key.replace("_", " "),
      })),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">Erro</p>
          <p>Não foi possível carregar os dados do paciente.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.pacientes}>
      <div className="bg-background min-h-screen py-8">
        <FormBase
          title="Editar Paciente"
          //@ts-ignore
          fields={campos}
          onSubmit={handleSubmit}
          buttonText="Atualizar Paciente"
          error={formError}
          //@ts-ignore
          initialValues={paciente ?? undefined}
          onSuccess={() => {
            setTimeout(() => router.push("/"), 500);
          }}
        />
      </div>
    </AuthGuard>
  );
}
