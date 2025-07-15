"use client";

import { useLogin } from "@/hooks/useLogin";

export function LoginForm() {
  const { form, error, loading, handleChange, handleSubmit } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md border border-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label
          htmlFor="matricula"
          className="block text-sm font-medium text-card-foreground"
        >
          Matrícula*
        </label>
        <input
          type="text"
          id="matricula"
          value={form.matricula}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
          placeholder="Digite sua matrícula"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="senha"
          className="block text-sm font-medium text-card-foreground"
        >
          Senha*
        </label>
        <input
          type="password"
          id="senha"
          value={form.senha}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
          placeholder="Digite sua senha"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium ${loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            Carregando...
          </span>
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
}
