"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Situacao, Paciente } from "@prisma/client";
import { z } from "zod";
import { peliculaSchema } from "@/validations/peliculaSchema";
import { useUser } from "@/contexts/userContext";
import { useFilteredFetch } from "@/hooks/useFilteredFetch";
import { findPatientByRecord } from "@/utils/findPatientByRecord";
import { api } from "@/api/fetch";
import { resetSessionCache } from "@/utils/sessionBrowser";
import { toast } from "sonner";

export function useCreatePelicula() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data: patients } = useFilteredFetch<Paciente[]>({ endpoint: "/api/pacientes", cacheKey: "@safeline/pacientes", useCache: true });
  const { userData } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    console.log("[Iniciando submissão de película]");
    try {
      setSubmitError(null);

      console.log("[Dados recebidos do formulário]:", formData);

      if (!userData?.hospitalId) {
        console.warn("[HospitalId inválido ou inexistente para o usuário]");
        throw new Error("Usuário não possui hospitalId válido");
      }

      if (!patients) {
        console.warn("[Lista de pacientes ainda não carregada]");
        throw new Error("Lista de pacientes não carregada");
      }

      const pacienteId = findPatientByRecord(patients, formData.registroPaciente);
      if (!pacienteId) {
        console.warn("[Paciente não encontrado com registro informado]:", formData.registroPaciente);
        setSubmitError("Paciente não encontrado com o registro informado.");
        return;
      }

      const formDataWithHospitalId = {
        ...formData,
        hospitalId: userData.hospitalId,
        pacienteId,
      };

      console.log("[Formulário enriquecido com hospitalId e pacienteId]:", formDataWithHospitalId);

      const parsedData = peliculaSchema.parse(formDataWithHospitalId);
      console.log("[Dados validados com sucesso]:", parsedData);

      const payload = {
        ...parsedData,
        situacao: Situacao.Manter,
        hospitalId: userData.hospitalId,
        pacienteId,
      };

      console.log("[Payload a ser enviado]:", payload);

      const { status, data } = await api("/api/peliculas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[Resposta da API]:", { status, data });

      if (status !== 201 || !data) {
        throw new Error("Erro ao cadastrar película");
      }

      console.log("[Película cadastrada com sucesso]");

      resetSessionCache("@safeline/cateteres");
      toast.success("Película cadastrada com sucesso");
      return true;
    } catch (error: any) {
      console.error("[Erro na submissão]:", error);
      if (error instanceof z.ZodError) {
        setSubmitError(error.errors[0]?.message || "Erro de validação");
      } else {
        setSubmitError(error.message || "Erro ao enviar formulário");
      }
    } finally {
      console.log("[Finalizando submissão de película]");
    }
  };

  return { handleSubmit, submitError, router };
}
