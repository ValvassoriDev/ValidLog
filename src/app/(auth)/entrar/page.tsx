import { Suspense } from "react";
import { Spinner } from "@/components/spinner";
import { LoginForm } from "@/components/loginForm";

export default function Entrar() {
  return (
    <>
      <div className="text-center mb-8 rounded-4xl">
        <div className="flex items-center justify-center gap-2 mb-2 rounded-4xl">
          <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100">
            <rect x="40" y="0" width="20" height="100" rx="10" fill="#A4F1D6" />
            <rect x="0" y="40" width="100" height="20" rx="10" fill="#A4F1D6" />

            <rect x="50" y="40" width="50" height="20" rx="10" fill="#5BC7C2" />
            <rect x="40" y="50" width="20" height="50" rx="10" fill="#5BC7C2" />
          </svg>

          <h1
            className="text-xl font-semibold text-card-foreground"
            style={{
              fontSize: 40,
            }}
          >
            SafeLine
          </h1>
        </div>
      </div>

      <Suspense fallback={<Spinner />}>
        <LoginForm />
      </Suspense>
    </>
  );
}
