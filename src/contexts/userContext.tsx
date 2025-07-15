"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Usuario } from "@prisma/client";
import { Spinner } from "@/components/spinner";

interface UserContextType {
  userData: Usuario | null;
  loading: boolean;
  error: string | null;
  refetchUser: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  loading: true,
  error: null,
  refetchUser: () => { },
});

const USER_CACHE_KEY = "userData";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const [userData, setUserData] = useState<Usuario | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const carregarDados = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/usuarios/${id}`);
      const json = await res.json();

      console.log(json)

      if (json?.id) {
        setUserData(json);
        if (typeof window !== "undefined") {
          localStorage.setItem(USER_CACHE_KEY, JSON.stringify(json));
        }
      } else {
        setError("Dados do usuário não encontrados.");
      }

    } catch (err: any) {
      setError(err.message || "Erro ao buscar dados do usuário.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(USER_CACHE_KEY);
      if (cached) {
        setUserData(JSON.parse(cached));
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (session?.user?.id && !userData) {
      carregarDados(session.user.id);
    }
  }, [session, userData]);

  const refetchUser = () => {
    setUserData(null);
    setError(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_CACHE_KEY);
    }
    if (session?.user?.id) {
      setLoading(true);
      carregarDados(session.user.id);
    }
  };

  return (
    <UserContext.Provider value={{ userData, loading, error, refetchUser }}>
      {loading ? <Spinner /> : error ? <div>{error}</div> : children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
