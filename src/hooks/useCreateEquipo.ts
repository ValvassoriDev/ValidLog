import { useUser } from "@/contexts/userContext";
import { findPatientByRecord } from "@/utils/findPatientByRecord";
import { equipoSchema } from "@/validations/equipoSchema";
import { Paciente, Situacao } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useFilteredFetch } from "./useFilteredFetch";
import { api } from "@/api/fetch";
import { resetSessionCache } from "@/utils/sessionBrowser";
import { toast } from "sonner";

export function useCreateEquipo() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { data: patients } = useFilteredFetch<Paciente[]>({ endpoint: "/api/pacientes", cacheKey: "@safeline/pacientes", useCache: true });
  const { userData } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    console.log("[Iniciando submissão de equipo]");
    try {
      setSubmitError(null);
      console.log("[Dados do formulário recebidos]:", formData);

      if (!userData?.hospitalId) throw new Error("Usuário não possui hospitalId válido");
      if (!patients) throw new Error("Lista de pacientes não carregada");

      const pacienteId = findPatientByRecord(patients, formData.registroPaciente);
      if (!pacienteId) {
        setSubmitError("Paciente não encontrado com o registro informado.");
        console.warn("[Paciente não encontrado]:", formData.registroPaciente);
        toast.error("Erro ao cadastrar equipo");
        return;
      }

      const formDataWithHospitalId = {
        ...formData,
        hospitalId: userData.hospitalId,
        pacienteId,
      };

      console.log("[Dados com hospitalId e pacienteId]:", formDataWithHospitalId);

      const parsedData = equipoSchema.parse(formDataWithHospitalId);
      console.log("[Dados validados com sucesso]:", parsedData);

      const payload = {
        ...parsedData,
        situacao: Situacao.Manter,
        hospitalId: userData.hospitalId,
        pacienteId,
      };

      const { status, data } = await api("/api/equipos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[Resposta da API]:", { status, data });

      if (status !== 201 || !data.id) {
        throw new Error("Erro ao cadastrar equipo");
      }

      resetSessionCache("@safeline/equipos");

      toast.success("Equipo cadastrado com sucesso");
      return true;
    } catch (error: any) {
      console.error("[Erro na submissão]:", error);
      if (error instanceof z.ZodError) {
        setSubmitError(error.errors[0]?.message || "Erro de validação");
      } else {
        setSubmitError(error.message || "Erro ao enviar formulário");
      }
      toast.error("Erro ao cadastrar equipo");
      return false;
    } finally {
      console.log("[Finalizando submissão de equipo]");
    }
  };

  return { handleSubmit, submitError, router };
}
