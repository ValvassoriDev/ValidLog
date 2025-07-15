"use client";

import { useRegister } from "@/hooks/useRegister";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const {
    form,
    error,
    isSubmitting,
    usuarios,
    handleChange,
    handleSubmit
  } = useRegister();
  const router = useRouter();

  const formFields = [
    { id: "nomeCompleto", label: "Nome Completo*", type: "text" },
    { id: "matricula", label: "Matrícula*", type: "text" },
    { id: "senha", label: "Senha*", type: "password" },
    { id: "confirmSenha", label: "Confirmar Senha*", type: "password" },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md border border-red-200 text-sm">
            {error}
          </div>
        )}

        {formFields.map(({ id, label, type }) => (
          <div key={id} className="space-y-2">
            <label
              htmlFor={id}
              className="block text-sm font-medium text-card-foreground"
            >
              {label}
            </label>
            <input
              id={id}
              type={type}
              value={(form as any)[id]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
              minLength={["senha", "confirmSenha"].includes(id) ? 6 : undefined}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {usuarios?.some(user => user.nivelAcesso === "TI") && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <button
            onClick={() => router.push("/entrar")}
            className="text-primary hover:underline"
          >
            Faça login
          </button>
        </div>
      )}
    </>
  );
}
