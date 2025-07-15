

import { Cateter, Danula, Equipo, Evolucao, MedicacaoRisco, Paciente, Pelicula } from "@prisma/client";
import { useFilteredFetch } from "../../hooks/useFilteredFetch";
import { StatCard } from "../StatCard/StatCard";
import { useCallback, useEffect } from "react";

export const DashAdmin = () => {

    const {
        data: pacientes, refetch: refetchPatients
    } = useFilteredFetch<Paciente[]>({ endpoint: "/api/pacientes", cacheKey: "@safeline/pacientes", useCache: false });

    const {
        data: cateteres, refetch: refetchCateteres
    } = useFilteredFetch<Cateter[]>({ endpoint: "/api/cateteres", cacheKey: "@safeline/cateters", useCache: false });

    const {
        data: peliculas, refetch: refetchPeliculas
    } = useFilteredFetch<Pelicula[]>({ endpoint: "/api/peliculas", cacheKey: "@safeline/peliculas", useCache: false });

    const {
        data: danulas, refetch: refetchDanulas
    } = useFilteredFetch<Danula[]>({ endpoint: "/api/danulas", cacheKey: "@safeline/danulas", useCache: false });

    const {
        data: equipos, refetch: refetchEquipos
    } = useFilteredFetch<Equipo[]>({ endpoint: "/api/equipos", cacheKey: "@safeline/equipos", useCache: false });

    const {
        data: medicacoes, refetch: refetchMedicacoes
    } = useFilteredFetch<MedicacaoRisco[]>({ endpoint: "/api/medicacoes-risco", cacheKey: "@safeline/medicacoes-risco", useCache: false });


    const {
        data: evolucoes, refetch: refetchEvolucoes
    } = useFilteredFetch<Evolucao[]>({ endpoint: "/api/evolucoes", cacheKey: "@safeline/evolucoes", useCache: false });

    const result = useCallback(() => {
        try {
            Promise.all([refetchEvolucoes(), refetchPatients(), refetchCateteres(), refetchPeliculas(), refetchDanulas(), refetchEquipos(), refetchMedicacoes()])
        } catch (error) {
            console.error(error)
        }
    }, []);


    useEffect(() => {
        const intervalId = setInterval(result, 300_000);

        return () => clearInterval(intervalId);
    }, [])
    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard urlPath='/pacientes' colorClass="bg-blue-700" title="Pacientes" value={pacientes?.length || 0} />
                    <StatCard urlPath='/cateteres' colorClass="bg-green-700" title="Cateteres" value={cateteres?.length || 0} />
                    <StatCard urlPath='/peliculas' colorClass="bg-red-700" title="Películas" value={peliculas?.length || 0} />
                    <StatCard urlPath='/danulas' colorClass="bg-indigo-600" title="Danulas" value={danulas?.length || 0} />
                    <StatCard urlPath='/equipos' colorClass="bg-purple-700" title="Equipos" value={equipos?.length || 0} />
                    <StatCard urlPath='/medicacoes-risco' colorClass="bg-teal-700" title="Medicações" value={medicacoes?.length || 0} />
                    <StatCard urlPath='/evolucoes' colorClass="bg-orange-300" title="Evoluções" value={evolucoes?.length || 0} />
                </div>
            </div>
        </>
    );
}


