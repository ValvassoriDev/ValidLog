import { Paciente } from "@prisma/client";
import { Spinner } from "./spinner";

interface PacienteCardProps {
  paciente: Paciente | null;
  loading: boolean;
}

export function PacienteCard({ paciente, loading }: PacienteCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 className="text-lg font-semibold text-blue-800">
            Paciente Associado
          </h2>
          {paciente ? (
            <>
              <p>
                <strong>Nome:</strong> {paciente.nomeCompleto}
              </p>
              <p>
                <strong>Registro:</strong> {paciente.registroPaciente}
              </p>
              {/* <p><strong>Status:</strong> {paciente.status}</p> */}
            </>
          ) : (
            <p>Não foi possível carregar informações do paciente.</p>
          )}
        </>
      )}
    </div>
  );
}
