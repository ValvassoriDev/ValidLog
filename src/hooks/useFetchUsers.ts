import { useState, useEffect } from "react";
import { api } from "@/api/fetch";
import type { Usuario } from "@prisma/client";

export function useFetchUsers() {
  const [users, setUsers] = useState<Usuario[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("[Iniciando busca de usuários]");
      try {
        setLoading(true);
        const { status, data } = await api<Usuario[]>("/api/usuarios");
        console.log("[Status da resposta]:", status);

        if (status === 200 && data) {
          console.log("[Usuários encontrados]:", data);
          setUsers(data);
        } else {
          console.warn("[Falha ao buscar usuários - status diferente de 200]");
          setError("Falha ao buscar usuários");
        }
      } catch (err) {
        console.error("[Erro ao buscar usuários]:", err);
        setError("Falha ao buscar usuários");
      } finally {
        console.log("[Finalizando busca de usuários]");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, error, loading };
}
