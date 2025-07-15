import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { NivelAcesso } from "@prisma/client";
import { useFetchUsers } from "./useFetchUsers";

export function useLogin() {
  const router = useRouter();
  const { users: usuarios } = useFetchUsers();

  const [form, setForm] = useState({
    matricula: "",
    senha: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(`[Alteração no campo]: ${id} = ${value}`);
    setForm((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("[Tentativa de login iniciada]");
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        matricula: form.matricula,
        password: form.senha,
        callbackUrl: "/",
      });

      console.log("[Resultado do signIn]:", result);

      if (result?.error) {
        console.warn("[Erro de autenticação]: Matrícula ou senha incorretas");
        setError("Matrícula ou senha incorretas");
      } else {
        console.log("[Login bem-sucedido, redirecionando]");
        router.push("/");
      }
    } catch (err: any) {
      console.error("[Erro durante login]:", err);
      setError("Ocorreu um erro durante o login");
    } finally {
      console.log("[Finalizando processo de login]");
      setLoading(false);
    }
  }, [form.matricula, form.senha, router]);

  useEffect(() => {
    if (usuarios) {
      console.log("[Usuários carregados]:", usuarios.length);
      const hasUsuarioTI = usuarios.some(user => user.nivelAcesso === NivelAcesso.TI);
      if (!hasUsuarioTI) {
        console.warn("[Nenhum usuário TI encontrado, redirecionando para cadastro]");
        router.push("/cadastro");
      }
    }
  }, [usuarios, router]);

  return {
    form,
    error,
    loading,
    handleChange,
    handleSubmit
  };
}
