import { api } from "@/api/fetch";
import { hospitalSchema } from "@/validations/hospitalSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export function useCreateHospital() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    console.log("[Iniciando submissão de hospital]");
    try {
      setSubmitError(null);

      console.log("[Dados do formulário recebidos]:", formData);

      const parsedData = hospitalSchema.parse(formData);

      console.log("[Dados validados com sucesso]:", parsedData);

      const { status, data } = await api("/api/hospitais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      console.log("[Resposta da API]:", { status, data });

      if (status !== 201 || !data.id) {
        throw new Error("Erro ao cadastrar hospital");
      }

      router.push(`/hospitais/${data.id}`);
      return true;
    } catch (error: any) {
      console.error("[Erro na submissão]:", error);
      if (error instanceof z.ZodError) {
        setSubmitError(error.errors[0]?.message || "Erro de validação");
      } else {
        setSubmitError(error.message || "Erro ao enviar formulário");
      }
    } finally {
      console.log("[Finalizando submissão de hospital]");
    }
  };

  return { handleSubmit, submitError, router };
}
