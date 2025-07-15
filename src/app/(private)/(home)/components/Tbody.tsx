import { IPacienteInterface } from "../../../../interfaces/IPacienteInterface";
import { RealTimeCell } from '../../../../components/RealTimeCell/RealTimeCell'
import { getTipoCateterColor } from "@/utils/getColors";
import { tipoCateterLabels } from "@/constants/labels";
import { formatExpire } from "@/utils/formatExpire";
import { CustomButton } from "../../../../components/Button/Button";
import { Situacao } from "@prisma/client";

type TBodyProps = {
    pacientes: IPacienteInterface[];
    setSelectedPatient: Function
}

export const TBody = ({ pacientes, setSelectedPatient }: TBodyProps) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {pacientes.map((paciente) => {
                return (
                    <tr
                        key={paciente.id}
                        className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
                    >
                        <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                            {paciente.roomNumber}
                        </td>
                        <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                            {paciente.registroPaciente}
                        </td>
                        <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                            {paciente.abreviacaoNome.toUpperCase()}
                        </td>
                        <td className="ppx-6 py-4 text-center text-sm font-medium text-gray-900">
                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTipoCateterColor(
                                    paciente?.cateteres.at(-1)?.tipoCateter
                                )}`}
                            >
                                {
                                    tipoCateterLabels[
                                    paciente?.cateteres.at(-1)?.tipoCateter
                                    ]
                                }
                            </span>
                        </td>
                        <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                            <RealTimeCell
                                //@ts-ignore
                                date={formatExpire(paciente?.cateteres.at(-1)?.expireIn)}
                                tipo={paciente?.cateteres.at(-1)?.tipoCateter}
                                situacao={
                                    paciente?.cateteres?.at(-1)?.situacao as Situacao
                                }
                                patient={paciente}
                                setSelectedPatient={setSelectedPatient}
                                patientRegister={paciente.registroPaciente}
                            />
                        </td>
                        <td className="px-6 py-4 text-center">
                            <RealTimeCell
                                //@ts-ignore
                                date={formatExpire(paciente?.peliculas.at(-1)?.expireIn)}
                                situacao={
                                    paciente?.peliculas?.at(-1)?.situacao as Situacao
                                }
                                patient={paciente}
                                setSelectedPatient={setSelectedPatient}
                                patientRegister={paciente.registroPaciente}
                            />
                        </td>
                        <td className="px-6 py-4 text-center">
                            <RealTimeCell
                                //@ts-ignore
                                date={formatExpire(paciente?.danulas.at(-1)?.expireIn)}
                                situacao={
                                    paciente?.danulas?.at(-1)?.situacao as Situacao
                                }
                                patient={paciente}
                                setSelectedPatient={setSelectedPatient}
                                patientRegister={paciente.registroPaciente}
                            />
                        </td>
                        <td className="px-6 py-4 text-center">
                            <RealTimeCell
                                //@ts-ignore
                                date={formatExpire(paciente?.equipos.at(-1)?.expireIn)}
                                situacao={
                                    paciente?.equipos?.at(-1)?.situacao as Situacao
                                }
                                patient={paciente}
                                setSelectedPatient={setSelectedPatient}
                                patientRegister={paciente.registroPaciente}
                            />
                        </td>
                        <td className="px-6 py-4 text-center">
                            <RealTimeCell
                                //@ts-ignore
                                date={formatExpire(paciente.medicacoesRisco.at(-1)?.expireIn)}
                                situacao={
                                    paciente?.medicacoesRisco?.at(-1)
                                        ?.situacao as Situacao
                                }
                                patient={paciente}
                                setSelectedPatient={setSelectedPatient}
                                patientRegister={paciente.registroPaciente}
                            />
                        </td>
                        <td className="px-6 py-4 text-center">
                            <CustomButton title="Detalhes" onClick={() => setSelectedPatient(paciente)} />
                        </td>
                    </tr>
                );
            })}
        </tbody>
    )
}