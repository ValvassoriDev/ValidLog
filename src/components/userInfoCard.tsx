import { useUser } from "@/contexts/userContext";
import { formatDate } from "@/utils/formatDate";
import { formatNivelAcesso } from "@/utils/formatNivelAcesso";
import { Usuario } from "@prisma/client";

export function UserInfoCard() {
  const { userData } = useUser() as {
      userData: Usuario & {
        hospital?: {
          nome?: string;
          endereco?: string;
        } | null;
      };
    };

  return (
    <div className="bg-card border border-border rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-card-foreground mb-4">
        Informações do Usuário
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Nome Completo</p>
            <p className="text-card-foreground text-lg">{userData.nomeCompleto}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Matrícula</p>
            <p className="text-card-foreground">{userData.matricula}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Data de Cadastro</p>
            <p className="text-card-foreground">{formatDate(userData.createdAt)}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Nível de Acesso</p>
            <p className="text-card-foreground">{formatNivelAcesso(userData.nivelAcesso)}</p>
          </div>

          {userData?.hospital && (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Hospital</p>
                <p className="text-card-foreground">{userData.hospital.nome}</p>
              </div>
              {userData.hospital.endereco && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Endereço</p>
                  <p className="text-card-foreground">{userData.hospital.endereco}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
