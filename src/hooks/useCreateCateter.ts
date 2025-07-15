"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Paciente, Situacao } from "@prisma/client";
import { z } from "zod";
import { cateterSchema } from "@/validations/cateterSchema";
import { useUser } from "@/contexts/userContext";
import { useFilteredFetch } from "@/hooks/useFilteredFetch";
import { findPatientByRecord } from "@/utils/findPatientByRecord";
import { api } from "@/api/fetch";
import { resetSessionCache } from "@/utils/sessionBrowser";
import { toast } from "sonner";

export function useCreateCateter() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    data: pacientes,
    error,
    loading,
  } = useFilteredFetch<Paciente[]>({
    endpoint: "/api/pacientes",
    cacheKey: "@safeline/pacientes",
    useCache: true,
  });
  const { userData } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      setSubmitError(null);

      console.log('HAHAHHAHAHA', formData)
      console.log('HAHAHHAHAHA', pacientes)

      if (!userData?.hospitalId) {
        throw new Error("Usuário não possui hospitalId válido");
      }

      if (loading) {
        throw new Error("Aguardando carregamento dos pacientes");
      }

      if (error) {
        throw new Error("Erro ao carregar lista de pacientes");
      }

      if (!Array.isArray(pacientes)) {
        throw new Error("Formato inválido dos dados de pacientes");
      }

      console.log('PACIENTES', pacientes)
      const pacienteId = findPatientByRecord(
        pacientes,
        formData.registroPaciente
      );
      if (!pacienteId) {
        setSubmitError("Paciente não encontrado com o registro informado.");
        return;
      }

      const paciente = pacientes.find((p) => p.id === pacienteId);
      if (!paciente) {
        throw new Error("Paciente não encontrado");
      }

      if (paciente.hospitalId !== userData.hospitalId) {
        throw new Error("Paciente não pertence ao seu hospital");
      }

      const formDataWithHospitalId = {
        ...formData,
        hospitalId: userData.hospitalId,
        pacienteId,
      };

      const parsedData = cateterSchema.parse(formDataWithHospitalId);

      const payload = {
        ...parsedData,
        situacao: Situacao.Manter,
        hospitalId: userData.hospitalId,
        pacienteId,
        insertedBy: userData.nomeCompleto,
      };

      const { status, data } = await api("/api/cateteres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (status !== 201 || !data.id) {
        throw new Error("Erro ao cadastrar cateter");
      }

      resetSessionCache("@safeline/cateteres");

      toast.success("Cateter cadastrado com sucesso");
      return true;
    } catch (error: any) {
      console.error("[Erro no cadastro de cateter]:", error);

      if (error instanceof z.ZodError) {
        setSubmitError(error.errors[0]?.message || "Erro de validação");
      } else {
        setSubmitError(error.message || "Erro ao enviar formulário");
      }

      toast.error("Erro ao cadastrar cateter");
      return false;
    }
  };

  return {
    handleSubmit,
    submitError,
    pacientesLoading: loading,
    pacientesError: error,
    router,
  };
}
