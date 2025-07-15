//@ts-nocheck
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  Status,
  Situacao,
  TipoCateter,
  CondicaoCateter,
  TipoEquipo,
  Turno,
  ModeloPelicula,
} from "@prisma/client";
import { CustomButton } from "../../../../components/Button/Button";
import { useState } from "react";
interface FiltersProps {
  filters: {
    status: Status | null;
    situacao: Situacao | null;
    tipoCateter: TipoCateter | null;
    condicaoCateter: CondicaoCateter | null;
    tipoEquipo: TipoEquipo | null;
    turno: Turno | null;
    modeloPelicula: ModeloPelicula | null;
  };
  onFilterChange: (filterName: string, value: any) => void;
  onResetFilters: () => void;
  handleOpenDash: () => void;
}

export const Filters = ({
  filters,
  onFilterChange,
  onResetFilters,
  handleOpenDash
}: FiltersProps) => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const buttonTitle = open === 1 ? "ocultar filtros" : "Ver filtros";
  return (
    <Accordion open={open === 1}>
      <div className="flex gap-8 pb-10">
        <CustomButton title={buttonTitle} onClick={() => handleOpen(1)} />
        <CustomButton title="DASHBOARD" onClick={handleOpenDash} />
      </div>
      <AccordionBody>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Filtros</h3>
            <CustomButton title="Limpar filtros" onClick={onResetFilters} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Situação */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Situação dos Itens
              </label>
              <select
                value={filters.situacao || ""}
                onChange={(e) =>
                  onFilterChange("situacao", e.target.value || null)
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="">Todos</option>
                {Object.values(Situacao).map((situacao) => (
                  <option key={situacao} value={situacao}>
                    {situacao}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Cateter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Cateter
              </label>
              <select
                value={filters.tipoCateter || ""}
                onChange={(e) =>
                  onFilterChange("tipoCateter", e.target.value || null)
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="">Todos</option>
                {Object.values(TipoCateter).map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Condição do Cateter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condição do Cateter
              </label>
              <select
                value={filters.condicaoCateter || ""}
                onChange={(e) =>
                  onFilterChange("condicaoCateter", e.target.value || null)
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="">Todos</option>
                {Object.values(CondicaoCateter).map((condicao) => (
                  <option key={condicao} value={condicao}>
                    {condicao.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Equipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Equipo
              </label>
              <select
                value={filters.tipoEquipo || ""}
                onChange={(e) =>
                  onFilterChange("tipoEquipo", e.target.value || null)
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="">Todos</option>
                {Object.values(TipoEquipo).map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            {/* Turno */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Turno
              </label>
              <select
                value={filters.turno || ""}
                onChange={(e) =>
                  onFilterChange("turno", e.target.value || null)
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="">Todos</option>
                {Object.values(Turno).map((turno) => (
                  <option key={turno} value={turno}>
                    {turno}
                  </option>
                ))}
              </select>
            </div>

            {/* Modelo de Película */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Modelo de Película
              </label>
              <select
                value={filters.modeloPelicula || ""}
                onChange={(e) =>
                  onFilterChange("modeloPelicula", e.target.value || null)
                }
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="">Todos</option>
                {Object.values(ModeloPelicula).map((modelo) => (
                  <option key={modelo} value={modelo}>
                    {modelo.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </AccordionBody>
    </Accordion>
  );
};
