import { site } from "../metadata";

export const metadata = site;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm max-w-md w-full text-center">
        {children}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition-colors text-center"
          >
            Voltar para Início
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-6">
          Se o problema persistir, entre em contato com o suporte técnico.
        </p>
      </div>
    </div>
  );
}
