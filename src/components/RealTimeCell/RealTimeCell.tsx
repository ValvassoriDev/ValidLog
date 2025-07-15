import {
    Situacao,
    TipoCateter,
} from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import {
    Button,
} from "@material-tailwind/react";
import { IPacienteInterface } from "../../interfaces/IPacienteInterface";
interface RealTimeCellProps {
    date: string | null;
    situacao?: Situacao;
    tipo?: string;
    patientRegister: string;
    patient: IPacienteInterface
    setSelectedPatient: Function
}

export const RealTimeCell = ({ date, tipo, patientRegister, setSelectedPatient, patient }: RealTimeCellProps) => {
    const [countToast, setCountToats] = useState(0)
    const isEmergency = tipo === TipoCateter.Emergencia;
    if (!isEmergency && tipo) {
        return "N/A";
    }
    const missingTime = Number(date?.split("H")[0]);

    const getTimeColor = () => {
        if (missingTime === 1) {
            return "bg-gray-900 text-yellow-500";
        }

        if (missingTime >= 2) {
            return "bg-green-50 text-green-800";
        }

        if (missingTime < 1) {
            if (!countToast) {
                setCountToats(countToast + 1)
                toast.error(`O paciente ${patientRegister} possui itens próximo do vencimento`, {
                    action:
                        <Button
                            onClick={() => setSelectedPatient(patient)}
                            variant="gradient"
                            className=""
                            color="white"
                            placeholder={undefined}
                            onResize={undefined}
                            style={{
                                width: 180,
                                height: 40,
                                backgroundColor: 'white'
                            }}
                            onResizeCapture={undefined}
                            onPointerEnterCapture={undefined}>
                            <span className="text-black">Detalhes</span>
                        </Button>

                });
            }

            return "bg-red-50 text-red-500";
        }
    };

    return (
        <div className="flex items-center justify-center">
            {date ? (
                <span
                    className={`inline-flex items-center px-2 py-1 rounded-md text-xl font-bold ${getTimeColor()}`}
                >
                    {date}
                </span>
            ) : (
                <span className="text-gray-400 text-sm">-</span>
            )}
        </div>
    );
};