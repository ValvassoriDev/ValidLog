import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Pelicula, Hospital, Paciente, Situacao } from "@prisma/client";
import { api } from "@/api/fetch";
import { toast } from "sonner";
interface ICustomPeliculaInterface extends Pelicula {
  hospitalId: string;
  hospital?: Hospital;
  pacienteId: string;
  paciente?: Paciente;
}

export function useShowPeliculaId() {
  const { id } = useParams<{ id: string }>();

  const [pelicula, setPelicula] = useState<ICustomPeliculaInterface | null>(null);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPaciente, setLoadingPaciente] = useState(false);
  const [loadingHospital, setLoadingHospital] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const loadPelicula = async () => {
      try {
        const res = await api(`/api/peliculas/${id}`);
        setPelicula(res.data);
        if (res.data.pacienteId) {
          loadPaciente(res.data.pacienteId);
        }
        if (res.data.hospitalId) {
          loadHospital(res.data.hospitalId);
        }
      } catch (error) {
        console.error("Erro ao carregar pelicula:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPelicula();
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

  const handleRemovePelicula = async () => {
    setIsRemoving(true);
    try {
      const res = await api(`/api/peliculas/${pelicula!.id}`, {
        method: "PUT",
        body: JSON.stringify({ situacao: Situacao.Removido }),
      });

      if (res.status === 200) {
        setPelicula((prevPelicula) => ({
          ...prevPelicula!,
          situacao: Situacao.Removido,
        }));
        toast.success("Pelicula removida com sucesso!");
      } else {
        toast.error("Erro ao remover a pelicula.");
      }
    } catch (error) {
      console.error("Erro ao remover a pelicula:", error);
      toast.error("Erro ao remover a pelicula.");
    } finally {
      setIsRemoving(false);
    }
  };

  const getLabel = (value: any, labels: Record<string, string>) => {
    return labels[value] || value;
  };

  return {
    pelicula,
    paciente,
    hospital,
    loading,
    loadingPaciente,
    loadingHospital,
    handleRemovePelicula,
    isRemoving,
    getLabel
  };
}
