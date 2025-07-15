import type { Paciente } from "@prisma/client";

export function findPatientByRecord(patients: Paciente[], record: string): string {
  if (!Array.isArray(patients)) {
    throw new Error("A lista de pacientes não é válida");
  }

  console.log('=========', patients)
  const patient = patients.find(
    (p) => typeof p?.registroPaciente === "string" && p.registroPaciente === record
  );

  console.log('=========', patient)
  if (!patient) {
    console.log(patients);
    throw new Error("Paciente não encontrado ou ID inválido");
  }

  return patient.id;
}
