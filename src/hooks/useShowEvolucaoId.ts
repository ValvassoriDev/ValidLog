import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Evolucao, Hospital, Paciente, Turno } from "@prisma/client";
import { api } from "@/api/fetch";
import { toast } from "sonner";

interface ICustomEvolucaoInterface extends Evolucao {
  hospitalId: string;
  hospital?: Hospital;
  pacienteId: string;
  paciente?: Paciente;
}

export function useShowEvolucaoId() {
  const { id } = useParams<{ id: string }>();

  const [evolucao, setEvolucao] = useState<ICustomEvolucaoInterface | null>(null);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPaciente, setLoadingPaciente] = useState(false);
  const [loadingHospital, setLoadingHospital] = useState(false);

  useEffect(() => {
    const loadEvolucao = async () => {
      try {
        const res = await api(`/api/evolucoes/${id}`);
        setEvolucao(res.data);
        if (res.data.pacienteId) {
          loadPaciente(res.data.pacienteId);
        }
        if (res.data.hospitalId) {
          loadHospital(res.data.hospitalId);
        }
      } catch (error) {
        console.error("Erro ao carregar evolução:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvolucao();
  }, [id]);

  const loadPaciente = async (pacienteId: string | null) => {
    if (pacienteId) {
      setLoadingPaciente(true);
      try {
        const res = await api(`/api/pacientes/${pacienteId}`);
        setPaciente(res.data);
      } catch (error) {
        console.error("Erro ao carregar paciente:", error);
      } finally {
        setLoadingPaciente(false);
      }
    }
  };

  const loadHospital = async (hospitalId: string | null) => {
    if (hospitalId) {
      setLoadingHospital(true);
      try {
        const res = await api(`/api/hospitais/${hospitalId}`);
        setHospital(res.data);
      } catch (error) {
        console.error("Erro ao carregar hospital:", error);
      } finally {
        setLoadingHospital(false);
      }
    }
  };

  const getLabel = (value: any, labels: Record<string, string>) => {
    return labels[value] || value;
  };

  return {
    evolucao,
    paciente,
    hospital,
    loading,
    loadingPaciente,
    loadingHospital,
    getLabel,
  };
}
