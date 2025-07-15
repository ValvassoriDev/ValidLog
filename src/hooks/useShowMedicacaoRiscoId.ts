import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MedicacaoRisco, Paciente, Hospital, Situacao } from "@prisma/client";
import { api } from "@/api/fetch";
import { toast } from "sonner";

interface ICustomMedicacaoRiscoInterface extends MedicacaoRisco {
  hospitalId: string;
  hospital?: Hospital;
  pacienteId: string;
  paciente?: Paciente;
}

export function useShowMedicacaoRiscoId() {
  const { id } = useParams<{ id: string }>();

  const [medicacaoRisco, setMedicacaoRisco] = useState<ICustomMedicacaoRiscoInterface | null>(null);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPaciente, setLoadingPaciente] = useState(false);
  const [loadingHospital, setLoadingHospital] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const loadMedicacaoRisco = async () => {
      try {
        const res = await api(`/api/medicacoes-risco/${id}`);
        setMedicacaoRisco(res.data);
        if (res.data.pacienteId) loadPaciente(res.data.pacienteId);
        if (res.data.hospitalId) loadHospital(res.data.hospitalId);
      } catch (error) {
        console.error("Erro ao carregar medicacao de risco:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMedicacaoRisco();
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

  const handleRemoveMedicacaoRisco = async () => {
    if (!medicacaoRisco) return;

    setIsRemoving(true);
    try {
      const res = await api(`/api/medicacoes_risco/${medicacaoRisco.id}`, {
        method: "PUT",
        body: JSON.stringify({ situacao: Situacao.Removido }),
      });

      if (res.status === 200) {
        setMedicacaoRisco((prevMedicacaoRisco) => ({
          ...prevMedicacaoRisco!,
          situacao: Situacao.Removido,
        }));
        toast.success("Medicação de risco removida com sucesso!");
      } else {
        toast.error("Erro ao remover medicação de risco.");
      }
    } catch (error) {
      console.error("Erro ao remover medicacao de risco:", error);
      toast.error("Erro ao remover a medicação de risco.");
    } finally {
      setIsRemoving(false);
    }
  };

  const getLabel = (value: any, labels: Record<string, string>) => {
    return labels[value] || value;
  };

  return {
    medicacaoRisco,
    paciente,
    hospital,
    loading,
    loadingPaciente,
    loadingHospital,
    handleRemoveMedicacaoRisco,
    isRemoving,
    getLabel,
  };
}
