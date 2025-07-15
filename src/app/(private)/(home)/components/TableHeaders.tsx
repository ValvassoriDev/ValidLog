const tableHeaders = [
    "Quarto",
    "Registro",
    "Nome Abreviado",
    "Tipo Cateter",
    "Cateter",
    "Película",
    "Danula",
    "Equipo",
    "Medicação de Risco",
    "Paciente"
] as const;

export const TableHeaders = () => {
    return (
        <tr className="divide-x divide-gray-300">
            {tableHeaders.map((header) => (
                <th
                    key={header}
                    className="px-6 py-3 text-center text-sm font-black text-primary-foreground bg-primary uppercase tracking-wider"
                >
                    {header}
                </th>
            ))}
        </tr>
    )
}