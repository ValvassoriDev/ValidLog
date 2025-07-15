"use client";

import { Usuario } from "@prisma/client";
import { useUser } from "@/contexts/userContext";
import AuthGuard from "@/contexts/authGuard";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { useState } from "react";
import { usePacientes } from "@/hooks/usePacientes";
import { HomeView } from "./components/HomeView";
import { IPacienteInterface } from "@/interfaces/IPacienteInterface";

export default function Home() {
  const { userData } = useUser() as {
    userData: Usuario & {
      hospital?: {
        nome?: string;
      } | null;
    };
  };

  const [selectedPatient, setSelectedPatient] =
    useState<IPacienteInterface | null>(null);
  const hospitalId = userData?.hospitalId?.toString();
  const { pacientes, loading } = usePacientes(hospitalId);

  if (!userData) return null;

  const isTI = userData.nivelAcesso === "TI";

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.home}>
      <div className="w-screen">
        <div className="w-screen">
          {!isTI && (
            <HomeView
              pacientes={pacientes}
              loading={loading}
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
            />
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
