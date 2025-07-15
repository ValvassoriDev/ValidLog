import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Hospital, Paciente, Equipo, Situacao } from "@prisma/client";
import { api } from "@/api/fetch";
import { toast } from "sonner";

interface ICustomEquipoInterface extends Equipo {
  hospitalId: string;
  hospital?: Hospital;
  pacienteId: string;
  paciente?: Paciente;
}

export function useShowEquipoId() {
  const { id } = useParams<{ id: string }>();

  const [equipo, setEquipo] = useState<ICustomEquipoInterface | null>(null);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPaciente, setLoadingPaciente] = useState(false);
  const [loadingHospital, setLoadingHospital] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const loadEquipo = async () => {
      try {
        const res = await api(`/api/equipos/${id}`);
        setEquipo(res.data);
        if (res.data.pacienteId) {
          loadPaciente(res.data.pacienteId);
        }
        if (res.data.hospitalId) {
          loadHospital(res.data.hospitalId);
        }
      } catch (error) {
        console.error("Erro ao carregar equipo:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEquipo();
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

  const handleRemoveEquipo = async () => {
    setIsRemoving(true);
    try {
      const res = await api(`/api/equipos/${equipo!.id}`, {
        method: "PUT",
        body: JSON.stringify({ situacao: Situacao.Removido }),
      });

      if (res.status === 200) {
        setEquipo((prevEquipo) => ({
          ...prevEquipo!,
          situacao: Situacao.Removido,
        }));
        toast.success("Equipo removido com sucesso!");
      } else {
        toast.error("Erro ao remover o equipo.");
      }
    } catch (error) {
      console.error("Erro ao remover equipo:", error);
      toast.error("Erro ao remover o equipo.");
    } finally {
      setIsRemoving(false);
    }
  };

  const getLabel = (value: any, labels: Record<string, string>) => {
    return labels[value] || value;
  };

  return {
    equipo,
    paciente,
    hospital,
    loading,
    loadingPaciente,
    loadingHospital,
    handleRemoveEquipo,
    isRemoving,
    getLabel,
  };
}
