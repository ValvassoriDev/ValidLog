import { prisma } from "@/lib/prisma";
import {
    Hospital,
    Log,
    Method,
    Paciente,
    Tables,
    Usuario,
} from "@prisma/client";

export type LogWithRelations = Log & {
    hospital: Hospital;
    patient: Paciente;
    user: Usuario
};

export const logRepository = {
    async list(): Promise<LogWithRelations[]> {
        try {
            const logs = await prisma.log.findMany({
                include: {
                    hospital: true,
                    paciente: true,
                    user: true
                },
            });

            return logs;
        } catch (error) {
            throw new Error("Erro ao buscar cateteres");
        }
    },

    async create(body: {
        method: Method;
        valueBefore: string;
        valueAfter: string;
        hospitalId: string;
        patientId: string;
        userId: string
        table: Tables
    }): Promise<Log> {
        try {
            const newLog = await prisma.log.create({
                data: {
                    method: body.method,
                    valueBefore: body.valueBefore,
                    valueAfter: body.valueAfter,
                    hospital: { connect: { id: body.hospitalId } },
                    patient: { connect: { id: body.patientId } },
                    user: { connect: { id: body.userId } },
                    table: body.table
                }
            });

            return newLog;
        } catch {
            throw new Error("Erro ao inserir log");
        }
    },

    // async findById(id: string): Promise<LogWithRelations | null> {
    //     try {
    //         const cateter = await prisma.cateter.findUnique({
    //             where: { id },
    //             include: {
    //                 hospital: true,
    //                 paciente: true,
    //             },
    //         });

    //         return cateter;
    //     } catch (error) {
    //         throw new Error("Erro ao buscar cateter");
    //     }
    // },
};
