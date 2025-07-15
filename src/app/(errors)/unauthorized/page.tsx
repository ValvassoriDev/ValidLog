"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function UnauthorizedContent() {
  const searchParams = useSearchParams();
  const mensagem =
    searchParams.get("mensagem") ||
    "Você não tem autorização para acessar esta página.";

  return (
    <>
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-label="Ícone de não autorizado"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01M6 12a6 6 0 1112 0 6 6 0 01-12 0z"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">Acesso Negado</h1>
      <p className="text-gray-600 mb-6">{mensagem}</p>
    </>
  );
}

export default function Unauthorized() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <UnauthorizedContent />
    </Suspense>
  );
}
