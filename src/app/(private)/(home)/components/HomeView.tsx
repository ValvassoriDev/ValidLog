import { PatientDetailsModal } from "@/components/patientDetailsModal";
import { IPacienteInterface } from "@/interfaces/IPacienteInterface";
import { Filters } from "./Filters";
import { Header } from "./Header";
import { Empty } from "./Empty";
import { TableHeaders } from "./TableHeaders";
import { TBody } from "./Tbody";
import { useFilterPatients } from '../Utils/useFilterPacientes'
import { useEffect, useState } from "react";
import { DashAdmin } from "../../../../components/DashAdmin/DashAdmin";

interface HomeViewProps {
  pacientes: IPacienteInterface[];
  loading: boolean;
  selectedPatient: IPacienteInterface | null;
  setSelectedPatient: (patient: IPacienteInterface | null) => void;
}

export const HomeView = ({
  pacientes: initialPacientes,
  loading,
  selectedPatient,
  setSelectedPatient,
}: HomeViewProps) => {
  const { filterPacientes, handleFilterChange, handleResetFilters, filters } = useFilterPatients()

  const [isDashVisible, setIsDashVisible] = useState<boolean>(false)
  const handleOpenDash = () => setIsDashVisible((v) => !v);
  const pacientes = filterPacientes(initialPacientes);


  return (
    <div className="pl-10 pr-10">
      {isDashVisible ? (
        // —> aqui passamos as props que o DashAdmin precisa
        <DashAdmin />
      ) : (
        <>
          <Header totalOfPatients={pacientes.length} />
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            handleOpenDash={handleOpenDash}
          />

          {loading ? (
            <div className="p-6 flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 "></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="divide-y divide-gray-200 w-full ">
                <thead className="bg-gray-50">
                  <TableHeaders />
                </thead>
                <TBody pacientes={pacientes} setSelectedPatient={setSelectedPatient} />
              </table>
              {pacientes.length === 0 && <Empty />}
            </div>
          )}

          {selectedPatient && (
            <PatientDetailsModal
              paciente={selectedPatient}
              onClose={() => setSelectedPatient(null)}
            />
          )}
        </>
      )}
    </div>
  );
};
