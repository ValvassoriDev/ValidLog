import { useState, useEffect } from "react";
import type { IPacienteInterface } from "@/interfaces/IPacienteInterface";

export const usePacientes = (hospitalId: string | undefined) => {
  const [pacientes, setPacientes] = useState<IPacienteInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchPacientes = async () => {
      if (!hospitalId) return;

      try {
        const response = await fetch(`/api?hospitalId=${hospitalId}`);
        const data = await response.json();
        setPacientes(data.data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();

    interval = setInterval(fetchPacientes, 300000);

    return () => clearInterval(interval);
  }, [hospitalId]);

  return { pacientes, loading };
};

