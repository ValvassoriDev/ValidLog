import { RegisterForm } from "@/components/registerForm";
import { Spinner } from "@/components/spinner";
import { Suspense } from "react";

export default function Cadastro() {
  return (
    <>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-primary text-2xl font-bold">+</span>
          <h1 className="text-xl font-semibold text-card-foreground">
            safe LINE
          </h1>
        </div>
        <p className="text-muted-foreground mt-2">
          Crie sua conta como usuário de Tecnologia da Informação
        </p>
      </div>

      <Suspense fallback={<Spinner />}>
        <RegisterForm />
      </Suspense>
    </>
  );
}
