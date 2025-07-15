"use client";

import { api } from "@/api/fetch";
import { useUser } from "@/contexts/userContext";
import { NivelAcesso } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSessionCache, setSessionCache } from "@/utils/sessionBrowser";

interface UseFilteredFetchProps {
  endpoint: string;
  cacheKey?: string;
  useCache?: boolean;
}

export function useFilteredFetch<T = any>({
  endpoint,
  cacheKey,
  useCache = false
}: UseFilteredFetchProps) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      if (cacheKey && useCache) {
        const cached = getSessionCache<T>(cacheKey);
        if (cached) {
          setData(cached);
          setLoading(false);
          return;
        }
      }

      const result: any = await api<T>(endpoint);
      let toStore: T | null = null;

      if (userData && userData.nivelAcesso !== NivelAcesso.TI) {
        const hospId = userData.hospitalId;
        if (Array.isArray(result.data)) {
          toStore = result.data.filter((item: any) => item.hospitalId === hospId) as T;
        } else if (result.data && result.data.hospitalId === hospId) {
          toStore = result.data;
        }
      } else {
        toStore = result.data;
      }

      setData(toStore);
      if (cacheKey && useCache && toStore != null) {
        setSessionCache(cacheKey, toStore);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) fetchData();
  }, [endpoint, userData]);

  const refetch = () => fetchData();

  return { data, error, loading, refetch, router };
}
