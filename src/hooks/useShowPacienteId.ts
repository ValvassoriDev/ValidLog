import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Paciente, Hospital, Cateter, Pelicula, Danula, Equipo, MedicacaoRisco, Evolucao } from "@prisma/client";
import { api } from "@/api/fetch";

interface IPacienteCompleto extends Paciente {
  hospital: Hospital;
  cateteres: Cateter[];
  peliculas: Pelicula[];
  danulas: Danula[];
  equipos: Equipo[];
  medicacoesRisco: MedicacaoRisco[];
  evolucoes: Evolucao[];
}

export function useShowPacienteId() {
  const { id } = useParams<{ id: string }>();

  const [paciente, setPaciente] = useState<IPacienteCompleto | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingHospital, setLoadingHospital] = useState(false);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("ID do paciente não fornecido.");
      setLoading(false);
      return;
    }

    const loadPaciente = async () => {
      console.log("[useEffect] Carregando paciente...");
      setLoading(true);
      try {
        const res = await api(`/api/pacientes/${id}`);
        setPaciente(res.data);
        console.log("[Paciente carregado]", res.data);

        if (res.data.hospitalId) {
          loadHospital(res.data.hospitalId);
        }
      } catch (error) {
        console.error("Erro ao carregar paciente:", error);
        setError("Erro ao carregar paciente.");
      } finally {
        setLoading(false);
      }
    };

    const loadHospital = async (hospitalid: string) => {
      console.log("[loadHospital] Carregando hospital...");
      setLoadingHospital(true);
      try {
        const res = await api(`/api/hospitais/${hospitalId}`);
        setHospital(res.data);
        console.log("[Hospital carregado]", res.data);
      } catch (error) {
        console.error("Erro ao carregar hospital:", error);
        setError("Erro ao carregar hospital.");
      } finally {
        setLoadingHospital(false);
      }
    };

    loadPaciente();
  }, [id]);

  return {
    paciente,
    hospital,
    loading,
    loadingHospital,
    error,
  };
}
