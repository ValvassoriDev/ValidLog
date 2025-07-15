import {
    Situacao,
    TipoCateter,
    CondicaoCateter,
    TipoEquipo,
    Turno,
    Status,
    ModeloPelicula,
} from "@prisma/client";
import { IPacienteInterface } from "@/interfaces/IPacienteInterface";
import { useState } from "react";

const getActiveItem = (items: ItemAtivo[]): ItemAtivo | null => {
    return items.find((item) => item.situacao !== Situacao.Removido) || null;
};

interface ItemAtivo {
    situacao: Situacao;
    dataInsercao: string;
    tipoCateter?: TipoCateter;
    condicao?: CondicaoCateter;
    tipo?: TipoEquipo;
    turno?: Turno;
    modeloPelicula?: ModeloPelicula;
    expireIn: string;
}

export const useFilterPatients = () => {
    const [filters, setFilters] = useState({
        status: null as Status | null,
        situacao: null as Situacao | null,
        tipoCateter: null as TipoCateter | null,
        condicaoCateter: null as CondicaoCateter | null,
        tipoEquipo: null as TipoEquipo | null,
        turno: null as Turno | null,
        modeloPelicula: null as ModeloPelicula | null,
    });

    const handleFilterChange = (filterName: string, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [filterName]: value,
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            status: null,
            situacao: null,
            tipoCateter: null,
            condicaoCateter: null,
            tipoEquipo: null,
            turno: null,
            modeloPelicula: null,
        });
    };

    const filterPacientes = (pacientes: IPacienteInterface[]) => {
        return pacientes.filter((paciente) => {
            const activeCateter = getActiveItem(
                paciente.cateteres as unknown as ItemAtivo[]
            );
            const activePelicula = getActiveItem(
                paciente.peliculas as unknown as ItemAtivo[]
            );
            const activeDanula = getActiveItem(
                paciente.danulas as unknown as ItemAtivo[]
            );
            const activeEquipo = getActiveItem(
                paciente.equipos as unknown as ItemAtivo[]
            );
            const activeMedicacao = getActiveItem(
                paciente.medicacoesRisco as unknown as ItemAtivo[]
            );

            if (filters.situacao) {
                const hasMatchingSituacao =
                    activeEquipo?.situacao === filters.situacao ||
                    activeDanula?.situacao === filters.situacao ||
                    activePelicula?.situacao === filters.situacao ||
                    activeCateter?.situacao === filters.situacao;

                if (!hasMatchingSituacao) return false;
            }

            if (
                filters.tipoCateter &&
                activeCateter?.tipoCateter !== filters.tipoCateter
            ) {
                return false;
            }

            if (
                filters.condicaoCateter &&
                activeCateter?.condicao !== filters.condicaoCateter
            ) {
                return false;
            }

            if (filters.tipoEquipo && activeEquipo?.tipo !== filters.tipoEquipo) {
                return false;
            }

            if (filters.turno) {
                const hasMatchingTurno =
                    activeEquipo?.turno === filters.turno ||
                    activeDanula?.turno === filters.turno ||
                    activePelicula?.turno === filters.turno ||
                    activeCateter?.turno === filters.turno ||
                    activeMedicacao?.turno === filters.turno;

                if (!hasMatchingTurno) return false;
            }

            if (
                filters.modeloPelicula &&
                activePelicula?.modeloPelicula !== filters.modeloPelicula
            ) {
                return false;
            }

            return true;
        });
    };

    return {
        filterPacientes,
        handleFilterChange,
        handleResetFilters,
        filters
    }
}



