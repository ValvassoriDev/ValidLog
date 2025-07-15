import { Hospital } from "@prisma/client";
import { Spinner } from "./spinner";

interface HospitalCardProps {
  hospital: Hospital;
  loading: boolean;
}

export function HospitalCard({ hospital, loading }: HospitalCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-blue-800">Hospital</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <p><strong>ID:</strong> {hospital.id}</p>
          <p><strong>Nome:</strong> {hospital.nome}</p>
          <p><strong>Endereço:</strong> {hospital.endereco}</p>
        </>
      )}
    </div>
  );
}
