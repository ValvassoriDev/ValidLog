import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Danula, Hospital, Paciente, Situacao } from "@prisma/client";
import { api } from "@/api/fetch";
import { toast } from "sonner";

interface ICustomDanulaInterface extends Danula {
  hospitalId: string;
  hospital?: Hospital;
  pacienteId: string;
  paciente?: Paciente;
}

export function useShowDanulaId() {
  const { id } = useParams<{ id: string }>();

  const [danula, setDanula] = useState<ICustomDanulaInterface | null>(null);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPaciente, setLoadingPaciente] = useState(false);
  const [loadingHospital, setLoadingHospital] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const loadDanula = async () => {
      try {
        const res = await api(`/api/danulas/${id}`);
        setDanula(res.data);
        if (res.data.pacienteId) {
          loadPaciente(res.data.pacienteId);
        }
        if (res.data.hospitalId) {
          loadHospital(res.data.hospitalId);
        }
      } catch (error) {
        console.error("Erro ao carregar danula:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDanula();
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

  const handleRemoveDanula = async () => {
    if (!danula) return;

    setIsRemoving(true);
    try {
      const res = await api(`/api/danulas/${danula.id}`, {
        method: "PUT",
        body: JSON.stringify({ situacao: Situacao.Removido }),
      });

      if (res.status === 200) {
        setDanula((prevDanula) => ({
          ...prevDanula!,
          situacao: Situacao.Removido,
        }));
        toast.success("Danula removida com sucesso!");
      } else {
        toast.error("Erro ao remover a danula.");
      }
    } catch (error) {
      console.error("Erro ao remover danula:", error);
      toast.error("Erro ao remover a danula.");
    } finally {
      setIsRemoving(false);
    }
  };

  const getLabel = (value: any, labels: Record<string, string>) => {
    return labels[value] || value;
  };

  return {
    danula,
    paciente,
    hospital,
    loading,
    loadingPaciente,
    loadingHospital,
    handleRemoveDanula,
    isRemoving,
    getLabel,
  };
}
