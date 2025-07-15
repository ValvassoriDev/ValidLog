import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Cateter, Hospital, Situacao } from "@prisma/client";
import { api } from "@/api/fetch";
import { toast } from "sonner";

interface ICustomCateterInterface extends Cateter {
  hospitalId: string;
  hospital?: Hospital
}

export function useShowCateterId() {
  const { id } = useParams<{ id: string }>();

  const [cateter, setCateter] = useState<ICustomCateterInterface | null>(null);
  const [paciente, setPaciente] = useState<any>(null);
  const [hospital, setHospital] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPaciente, setLoadingPaciente] = useState(false);
  const [loadingHospital, setLoadingHospital] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const loadCateter = async () => {
      try {
        const res = await api(`/api/cateteres/${id}`);
        setCateter(res.data);
        if (res.data.pacienteId) {
          loadPaciente(res.data.pacienteId);
        }
        if (res.data.hospitalId) {
          loadHospital(res.data.hospitalId);
        }
      } catch (error) {
        console.error("Erro ao carregar cateter:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCateter();
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

  const handleRemoveCateter = async () => {
    setIsRemoving(true);
    try {
      const res = await api(`/api/cateteres/${cateter!.id}`, {
        method: "PUT",
        body: JSON.stringify({ situacao: Situacao.Removido }),
      });

      if (res.status === 200) {
        setCateter((prevCateter) => ({
          ...prevCateter!,
          situacao: Situacao.Removido,
        }));
        toast.success("Cateter removido com sucesso!");
      } else {
        toast.error("Erro ao remover o cateter.");
      }
    } catch (error) {
      console.error("Erro ao remover cateter:", error);
      toast.error("Erro ao remover o cateter.");
    } finally {
      setIsRemoving(false);
    }
  };

  return {
    cateter,
    paciente,
    hospital,
    loading,
    loadingPaciente,
    loadingHospital,
    getLabel,
    handleRemoveCateter,
    isRemoving,
  };
}
