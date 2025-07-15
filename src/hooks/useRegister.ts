import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { NivelAcesso } from "@prisma/client";

export function useRegister() {
  const router = useRouter();
  const [form, setForm] = useState({
    nomeCompleto: "",
    matricula: "",
    senha: "",
    confirmSenha: "",
    nivelAcesso: NivelAcesso.TI,
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsuarios = useCallback(async () => {
    console.log("[Iniciando busca de usuários para verificação de TI]");
    try {
      const response = await fetch("/api/usuarios");
      if (response.status !== 200) {
        console.error(`[Erro HTTP ${response.status}] ao buscar usuários`);
        throw new Error("Erro ao buscar usuários");
      }
      const data = await response.json();
      console.log("[Usuários encontrados]:", data);
      setUsuarios(data);
    } catch (err) {
      console.error("[Erro ao carregar usuários]:", err);
    } finally {
      console.log("[Finalizando busca de usuários]");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  useEffect(() => {
    if (!loading && usuarios) {
      const usuarioTI = usuarios.find(user => user.nivelAcesso === NivelAcesso.TI);
      if (usuarioTI) {
        console.warn("[Usuário TI já existe, redirecionando para /unauthorized]");
        router.push("/unauthorized");
      } else {
        console.log("[Nenhum usuário TI encontrado, cadastro permitido]");
      }
    }
  }, [usuarios, loading, router]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(`[Alteração no formulário]: ${id} = ${value}`);
    setForm(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("[Tentativa de cadastro iniciada]");
    if (form.senha !== form.confirmSenha) {
      console.warn("[Senhas não coincidem]");
      setError("As senhas não coincidem");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.status !== 201) {
        const data = await response.json();
        console.error("[Erro no cadastro]:", data.error);
        throw new Error(data.error || "Erro no cadastro");
      }

      console.log("[Cadastro realizado com sucesso, redirecionando para /entrar]");
      router.push("/entrar");
    } catch (err: any) {
      console.error("[Erro durante o cadastro]:", err);
      setError(err.message || "Erro desconhecido");
    } finally {
      console.log("[Finalizando tentativa de cadastro]");
      setIsSubmitting(false);
    }
  }, [form, router]);

  return {
    form,
    error,
    loading,
    isSubmitting,
    usuarios,
    handleChange,
    handleSubmit
  };
}
