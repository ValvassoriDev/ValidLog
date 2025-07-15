"use client";

import { NivelAcesso } from "@prisma/client";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { TableBase } from "@/components/tableBase";
import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";

export default function UserListPage() {
  const { users, error, loading } = useFetchUsers();

  const usuariosSemTI = users?.filter((usuario: any) => usuario.nivelAcesso !== NivelAcesso.TI);

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.usuarios}>
      <TableBase
        title="Usuários"
        records={usuariosSemTI || []}
        columns={[
          { title: "Nome", field: "nomeCompleto" },
          { title: "Matrícula", field: "matricula" },
          { title: "Cargo", field: "nivelAcesso" },
          { title: "Hospital", field: ["hospital", "nome"] },
        ]}
        newRecordUrl="/usuarios/formulario/cadastro"
        newRecordButtonText="Novo Usuário"
        loading={loading}
        error={error}
      />
    </AuthGuard>
  );
}
