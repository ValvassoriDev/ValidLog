import { useUser } from "@/contexts/userContext";
import { findPatientByRecord } from "@/utils/findPatientByRecord";
import { medicacaoRiscoSchema } from "@/validations/medicacaoRiscoSchema";
import { Paciente, Situacao } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useFilteredFetch } from "./useFilteredFetch";
import { api } from "@/api/fetch";
import { resetSessionCache } from "@/utils/sessionBrowser";
import { toast } from "sonner";

export function useCreateMedicacaoRisco() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data: patients } = useFilteredFetch<Paciente[]>({ endpoint: "/api/pacientes", cacheKey: "@safeline/pacientes", useCache: true });
  const { userData } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    console.log("[Iniciando submissão de medicação de risco]");
    try {
      setSubmitError(null);

      if (!userData?.hospitalId) {
        console.warn("[Usuário sem hospitalId válido]");
        throw new Error("Usuário não possui hospitalId válido");
      }

      if (!patients) {
        console.warn("[Lista de pacientes não carregada]");
        throw new Error("Lista de pacientes não carregada");
      }

      console.log("[Dados do formulário recebidos]:", formData);

      const pacienteId = findPatientByRecord(patients, formData.registroPaciente);

      if (!pacienteId) {
        console.warn("[Paciente não encontrado com o registro informado]");
        setSubmitError("Paciente não encontrado com o registro informado.");
        return;
      }

      const formDataWithHospitalId = {
        ...formData,
        hospitalId: userData.hospitalId,
        pacienteId,
      };

      console.log("[Formulário enriquecido com hospitalId e pacienteId]:", formDataWithHospitalId);

      const parsedData = medicacaoRiscoSchema.parse(formDataWithHospitalId);
      console.log("[Dados validados com sucesso]:", parsedData);

      const payload = {
        ...parsedData,
        situacao: Situacao.Manter,
        hospitalId: userData.hospitalId,
        pacienteId,
      };

      console.log("[Payload a ser enviado]:", payload);

      const { status, data } = await api("/api/medicacoes-risco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[Resposta da API]:", { status, data });

      if (status !== 201 || !data.id) {
        throw new Error("Erro ao cadastrar medicação de risco");
      }

      resetSessionCache("@safeline/medicacoes-risco");
      toast.success("Medicação cadastrada com sucesso");
      return true;
    } catch (error: any) {
      console.error("[Erro na submissão]:", error);
      if (error instanceof z.ZodError) {
        setSubmitError(error.errors[0]?.message || "Erro de validação");
      } else {
        setSubmitError(error.message || "Erro ao enviar formulário");
      }
    } finally {
      console.log("[Finalizando submissão de medicação de risco]");
    }
  };

  return { handleSubmit, submitError, router };
}
