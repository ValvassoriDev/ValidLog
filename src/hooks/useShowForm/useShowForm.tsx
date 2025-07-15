import React, { useCallback } from 'react';
import {
    EVOLUCAO_FIELDS,
    EQUIPO_FIELDS,
    PELICULA_FIELDS,
    CATETER_FIELDS,
    DANULA_FIELDS,
    MEDICACAO_RISCO_FIELDS,
} from "@/constants/formFields";
import { useCreateCateter } from "@/hooks/useCreateCateter";
import { useCreatePelicula } from "@/hooks/useCreatePelicula";
import { useCreateEquipo } from "@/hooks/useCreateEquipo";
import { useCreateDanula } from "@/hooks/useCreateDanula";
import { useCreateMedicacaoRisco } from "@/hooks/useCreateMedicacaoRisco";
import { useCreateEvolucao } from "@/hooks/useCreateEvolucao";
import { FormBase } from "@/components/formBase";
import { IPacienteInterface } from '../../interfaces/IPacienteInterface';

type ShowFormProps = {
    patient: IPacienteInterface
}

export const useShowForm = ({ patient }: ShowFormProps) => {
    const { handleSubmit, submitError } = useCreateCateter();
    const {
        handleSubmit: handleSubmitPelicula,
        submitError: submitErrorPelicula,
    } = useCreatePelicula();
    const { handleSubmit: handleSubmitEquipo, submitError: submitErrorEquipo } =
        useCreateEquipo();
    const { handleSubmit: handleSubmitDanula, submitError: submitErrorDanula } =
        useCreateDanula();
    const {
        handleSubmit: handleSubmitMedicacao,
        submitError: submitErrorMedicacao,
    } = useCreateMedicacaoRisco();

    const {
        handleSubmit: handleSubmitEvolucao,
        submitError: submitErrorEvolucao,
    } = useCreateEvolucao();

    const [open, setOpen] = React.useState<string>("");

    const handleOpen = (option) => setOpen(option);
    const ShowForm = useCallback(() => {

        // Mapeamento de configurações para cada formulário
        const formMap = {
            cateter: {
                title: 'Cadastro de Cateter',
                fields: CATETER_FIELDS,
                onSubmit: handleSubmit,
                buttonText: 'Cadastrar Cateter',
                error: submitError,
            },
            pelicula: {
                title: 'Cadastro de Película',
                fields: PELICULA_FIELDS,
                onSubmit: handleSubmitPelicula,
                buttonText: 'Cadastrar Película',
                error: submitErrorPelicula,
            },
            equipos: {
                title: 'Cadastro de Equipo',
                fields: EQUIPO_FIELDS,
                onSubmit: handleSubmitEquipo,
                buttonText: 'Cadastrar Equipo',
                error: submitErrorEquipo,
            },
            danulas: {
                title: 'Cadastro de Dânula',
                fields: DANULA_FIELDS,
                onSubmit: handleSubmitDanula,
                buttonText: 'Cadastrar Dânula',
                error: submitErrorDanula,
            },
            medicacao: {
                title: 'Cadastro de Medicação de Risco',
                fields: MEDICACAO_RISCO_FIELDS,
                onSubmit: handleSubmitMedicacao,
                buttonText: 'Cadastrar Medicação',
                error: submitErrorMedicacao,
            },
            evolucao: {
                title: 'Cadastro de Evolução',
                fields: EVOLUCAO_FIELDS,
                onSubmit: handleSubmitEvolucao,
                buttonText: 'Cadastrar Evolução',
                error: submitErrorEvolucao,
            },
        };

        // Seleciona a configuração com base no valor de "open"
        const config = formMap[open];
        if (!config) return null;

        const { title, fields, onSubmit, buttonText, error } = config;
        return (
            <FormBase
                title={title}
                // @ts-ignore
                fields={fields}
                // @ts-ignore
                onSubmit={onSubmit}
                initialValues={patient}
                buttonText={buttonText}
                error={error}
                onSuccess={() => handleOpen('')}
            />
        );
    }, [
        open,
        patient,
        handleOpen,
        handleSubmit,
        handleSubmitPelicula,
        handleSubmitEquipo,
        handleSubmitDanula,
        handleSubmitMedicacao,
        handleSubmitEvolucao,
        submitError,
        submitErrorPelicula,
        submitErrorEquipo,
        submitErrorDanula,
        submitErrorMedicacao,
        submitErrorEvolucao,
    ]);

    return {
        handleOpen,
        ShowForm,
        open
    }
}
