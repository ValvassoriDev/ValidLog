"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "./userContext";
import { Spinner } from "@/components/spinner";

interface AuthGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function AuthGuard({ allowedRoles, children }: AuthGuardProps) {
  const router = useRouter();
  const { status } = useSession();
  const { userData, loading } = useUser();

  useEffect(() => {
    console.log("[AuthGuard] Status de carregamento:", loading);
    console.log("[AuthGuard] Status da sessão:", status);
    console.log("[AuthGuard] Dados do usuário:", userData);

    if (loading || status === "loading") {
      console.log("[AuthGuard] Carregando dados, esperando...");
      return;
    }

    if (!userData) {
      console.log("[AuthGuard] Usuário não autenticado, redirecionando para login...");
      router.push("/entrar");
      return;
    }

    if (!allowedRoles.includes("*") && !allowedRoles.includes(userData.nivelAcesso)) {
      console.log("[AuthGuard] Acesso negado, redirecionando para 'unauthorized'...");
      router.push("/unauthorized");
    }
  }, [userData, loading, status, router, allowedRoles]);

  if (loading || status === "loading") {
    return <Spinner />;
  }

  console.log("[AuthGuard] Autenticação bem-sucedida, renderizando filhos...");
  return <>{children}</>;
}
