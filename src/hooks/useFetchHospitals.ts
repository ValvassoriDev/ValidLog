import { useState, useEffect } from "react";
import { api } from "@/api/fetch";
import type { Hospital } from "@prisma/client";

export function useFetchHospitals() {
  const [hospitals, setHospitals] = useState<Hospital[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      console.log("[Iniciando busca de hospitais]");
      try {
        setLoading(true);
        const { status, data } = await api<Hospital[]>("/api/hospitais");
        console.log("[Status da resposta]:", status);

        if (status === 200 && data) {
          console.log("[Hospitais encontrados]:", data);
          setHospitals(data);
        } else {
          console.warn("[Falha ao buscar hospitais - status diferente de 200]");
          setError("Falha ao buscar hospitais");
        }
      } catch (err) {
        console.error("[Erro ao buscar hospitais]:", err);
        setError("Falha ao buscar hospitais");
      } finally {
        console.log("[Finalizando busca de hospitais]");
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return { hospitals, error, loading };
}
