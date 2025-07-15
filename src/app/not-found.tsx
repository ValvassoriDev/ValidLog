"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function NotFoundContent() {
  const searchParams = useSearchParams();
  const mensagem =
    searchParams.get("mensagem") ??
    "Desculpe, a página que você está procurando não pôde ser encontrada. Talvez ela tenha sido removida ou o link esteja incorreto.";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md border border-green-100 p-8 text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-label="Ícone de página não encontrada"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Página Não Encontrada</h1>
        <p className="text-gray-600 mb-6">{mensagem}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition-colors text-center"
          >
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
