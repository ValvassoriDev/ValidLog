import { api } from "@/api/fetch";
import { useUser } from "@/contexts/userContext";
import { usuarioSchema } from "@/validations/usuarioSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export function useCreateUsuario() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { userData } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: Record<string, string>) => {
    console.log("[Iniciando submissão de usuário]");
    try {
      setSubmitError(null);

      console.log("[Dados recebidos do formulário]:", formData);
      const parsedData = usuarioSchema.parse(formData);
      console.log("[Dados validados com sucesso]:", parsedData);

      if (!userData?.hospitalId) {
        console.warn("[HospitalId inválido ou inexistente para o usuário]");
        throw new Error("Usuário não possui hospitalId válido");
      }

      const payload = {
        ...parsedData,
        hospitalId: userData.hospitalId,
      };

      console.log("[Payload a ser enviado]:", payload);

      const { status, data } = await api("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("[Resposta da API]:", { status, data });

      if (status !== 201 || !data) {
        throw new Error("Erro ao cadastrar usuário");
      }

      console.log("[Usuário cadastrado com sucesso]");

      return true;
    } catch (error: any) {
      console.error("[Erro na submissão]:", error);
      if (error instanceof z.ZodError) {
        setSubmitError(error.errors[0]?.message || "Erro de validação");
      } else {
        setSubmitError(error.message || "Erro ao enviar formulário");
      }
    } finally {
      console.log("[Finalizando submissão de usuário]");
    }
  };

  return { handleSubmit, submitError, router };
}
