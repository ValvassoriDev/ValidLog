import { REGISTRO_PACIENTE_FIELD_READONLY, REGISTRO_PACIENTE_FIELD, TURNO_FIELD, SITUACAO_FIELD } from '@/constants/baseFields'
import { CondicaoCateter, IdentificacaoStatus, ModeloPelicula, Sexo, TipoCateter, TipoEquipo } from '@prisma/client'

export const CATETER_FIELDS = [
    REGISTRO_PACIENTE_FIELD_READONLY,
    TURNO_FIELD,
    {
        id: 'identificacaoStatus',
        label: 'Identificação',
        required: true,
        type: 'select',
        options: [
            {
                value: IdentificacaoStatus.Identificada_via_Central,
                label: 'Identificada via Central',
            },
            { value: IdentificacaoStatus.Identificado, label: 'Identificado' },
            {
                value: IdentificacaoStatus.Nao_Identificado,
                label: 'Não Identificado',
            },
        ],
    },
    {
        id: 'condicao',
        label: 'Condição',
        required: true,
        type: 'select',
        options: [
            { value: CondicaoCateter.Em_Ordem, label: 'Em Ordem' },
            { value: CondicaoCateter.Padronizar, label: 'Padronizar' },
            { value: CondicaoCateter.Atencao, label: 'Atenção' },
        ],
    },
    {
        id: 'tipoCateter',
        label: 'Tipo de Cateter',
        required: true,
        type: 'select',
        options: [
            { value: TipoCateter.Periferico, label: 'Periférico' },
            { value: TipoCateter.Central, label: 'Central' },
            { value: TipoCateter.PICC, label: 'PICC' },
            { value: TipoCateter.Portocath, label: 'Portocath' },
            { value: TipoCateter.Periferico_Longo, label: 'Periférico Longo' },
            { value: TipoCateter.Sem_Acesso, label: 'Sem Acesso' },
            { value: TipoCateter.Emergencia, label: 'Emergência' },
            { value: TipoCateter.PowerPICC, label: 'PowerPICC' },
        ],
    },
]

export const PELICULA_FIELDS = [
    REGISTRO_PACIENTE_FIELD_READONLY,
    TURNO_FIELD,
    SITUACAO_FIELD,
    {
        id: 'modeloPelicula',
        label: 'Modelo de Película',
        required: true,
        type: 'select',
        options: [
            { value: ModeloPelicula.Recem_Aplicada, label: 'Recém Aplicada' },
            { value: ModeloPelicula.Pelicula_com_Gaze, label: 'Película com Gaze' },
            { value: ModeloPelicula.Pelicula_Fixa, label: 'Película Fixa' },
        ],
    },
]

export const DANULA_FIELDS = [REGISTRO_PACIENTE_FIELD_READONLY, TURNO_FIELD, SITUACAO_FIELD]

export const EQUIPO_FIELDS = [
    REGISTRO_PACIENTE_FIELD_READONLY,
    TURNO_FIELD,
    SITUACAO_FIELD,
    {
        id: 'tipo',
        label: 'Tipo de Equipo',
        required: true,
        type: 'select',
        options: [
            { value: TipoEquipo.Simples, label: 'Simples' },
            { value: TipoEquipo.Bomba, label: 'Bomba' },
        ],
    },
]

export const MEDICACAO_RISCO_FIELDS = [
    REGISTRO_PACIENTE_FIELD_READONLY,
    TURNO_FIELD,
    SITUACAO_FIELD,
    {
        id: 'medicacao',
        label: 'Medicação',
        required: true,
        type: 'text',
    },
    {
        id: 'duracaoHoras',
        label: 'Duração (horas)',
        required: true,
        type: 'number',
    },
]

export const EVOLUCAO_FIELDS = [
    REGISTRO_PACIENTE_FIELD_READONLY,
    TURNO_FIELD,
    {
        id: 'profissional',
        label: 'Profissional',
        required: true,
        type: 'text',
    },
    {
        id: 'anotacao',
        label: 'Anotação',
        required: true,
        type: 'textarea',
    },
]

export const PACIENTE_FIELDS = [
    {
        id: 'nomeCompleto',
        label: 'Nome Completo',
        required: true,
        type: 'text',
    },
    {
        id: 'cpf',
        label: 'CPF',
        required: true,
        type: 'text',
    },
    
        {
        id: 'endereco',
        label: 'Endereço',
        required: true,
        type: 'text',
    },
        {
        id: 'cep',
        label: 'CEP',
        required: true,
        type: 'text',
    },

    {
        id: 'placa',
        label: 'Placa',
        required: false,
        type: 'text',
    },

    {
        id: 'veiculo',
        label: 'Veiculo',
        required: true,
        type: 'select',
        options: [
            { value: 'truck', label: 'Truck' },
            { value: '3/4', label: '3/4' },
            { value: 'toco', label: 'Toco' },
            { value: 'van', label: 'VAN' },
        ],
    },
]
