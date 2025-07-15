import { api } from "@/api/fetch";
import { useUser } from "@/contexts/userContext";
import { resetSessionCache } from "@/utils/sessionBrowser";
import { pacienteSchema } from "@/validations/pacienteSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export function useCreatePaciente() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { userData } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    console.log("[Iniciando submissão de paciente]");

    try {
      if (!userData?.hospitalId) {
        console.warn("[Usuário sem hospitalId válido]");
        throw new Error("Usuário não possui hospitalId válido");
      }

      console.log("[Dados do formulário recebidos]:", formData);

      const cleanedFormData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          value === "" ? undefined : value,
        ])
      );

      console.log("[Limpando Formulário com items vazios]:", cleanedFormData);

      const formDataWithHospitalId = {
        ...cleanedFormData,
        hospitalId: userData.hospitalId,
        insertedBy: userData.nomeCompleto,
      };

      console.log(
        "[Formulário enriquecido com hospitalId e usuário logado]:",
        formDataWithHospitalId
      );

      setSubmitError(null);

      const parsedData = pacienteSchema.parse(formDataWithHospitalId);

      console.log("[Dados validados com sucesso]:", parsedData);

      const payload = {
        ...parsedData,
        insertedBy: userData.nomeCompleto,
        hospitalId: userData.hospitalId,
      };

      console.log("[Payload a ser enviado]:", payload);

      const { status, data } = await api("/api/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[Resposta da API]:", { status, data });

      if (status !== 201 || !data.id) {
        throw new Error("Erro ao cadastrar paciente");
      }

      console.log("[Paciente cadastrado com sucesso]");

      resetSessionCache("@safeline/pacientes");

      toast.success("Paciente cadastrado com sucesso");
      return true;
    } catch (error: any) {
      console.error("[Erro na submissão]:", error);
      if (error instanceof z.ZodError) {
        setSubmitError(error.errors[0]?.message || "Erro de validação");
      } else {
        setSubmitError(error.message || "Erro ao enviar formulário");
      }
    } finally {
      console.log("[Finalizando submissão de paciente]");
    }
  };

  return { handleSubmit, submitError, router };
}
