//@ts-nocheck

import { CondicaoCateter, ModeloPelicula, PrismaClient, Sexo, Situacao, Status, TipoCateter, TipoEquipo, TipoSanguineo, Turno } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';

const prisma = new PrismaClient();

async function main() {
  // Criar hospital se não existir
  const hospital = await prisma.hospital.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nome: 'Hospital Geral de São Paulo',
      endereco: 'Av. Dr. Enéas Carvalho de Aguiar, 255 - Cerqueira César, São Paulo - SP',
    },
  });

  console.log(`Hospital criado: ${hospital.nome}`);

  // Tipos de pacientes
  const tiposSanguineos: Array<keyof typeof TipoSanguineo> = [
    'A_Pos', 'A_Neg', 'B_Pos', 'B_Neg', 'AB_Pos', 'AB_Neg', 'O_Pos', 'O_Neg'
  ];
  
  const sexos: Array<keyof typeof Sexo> = ['M', 'F'];
  const statusPacientes: Array<keyof typeof Status> = ['Ativo', 'Internado', 'Suspenso', 'Alta_dos_Atendimentos', 'Obito'];
  
  // Tipos para os itens
  const situacoes: Array<keyof typeof Situacao> = ['Manter', 'Atencao', 'Vencido'];
  const turnos: Array<keyof typeof Turno> = ['MANHA', 'TARDE', 'NOITE', 'MADRUGADA'];
  const tiposCateter: Array<keyof typeof TipoCateter> = ['Periferico', 'Central', 'PICC', 'Portocath', 'Periferico_Longo'];
  const condicoesCateter: Array<keyof typeof CondicaoCateter> = ['Em_Ordem', 'Padronizar', 'Atencao'];
  const tiposEquipo: Array<keyof typeof TipoEquipo> = ['Simples', 'Bomba'];
  const modelosPelicula: Array<keyof typeof ModeloPelicula> = ['Recem_Aplicada', 'Pelicula_com_Gaze', 'Pelicula_Fixa'];

  // Gerar 20 pacientes
  for (let i = 0; i < 20; i++) {
    const registroPaciente = `P${(1000 + i).toString()}`;
    const nomeCompleto = faker.person.fullName();
    const abreviacaoNome = nomeCompleto.split(' ')[0] + ' ' + nomeCompleto.split(' ').pop();
    const tipoSanguineo = faker.helpers.arrayElement(tiposSanguineos);
    const sexo = faker.helpers.arrayElement(sexos);
    const status = faker.helpers.arrayElement(statusPacientes);
    
    const paciente = await prisma.paciente.create({
      data: {
        registroPaciente,
        nomeCompleto,
        abreviacaoNome,
        tipoSanguineo,
        sexo,
        status,
        diagnostico: faker.helpers.arrayElement([
          'Hipertensão arterial',
          'Diabetes mellitus',
          'Pneumonia',
          'Insuficiência cardíaca',
          'Sepse',
          'AVC',
          'Infarto agudo do miocárdio',
          null
        ]),
        deficiencia: faker.helpers.arrayElement([
          'Visual',
          'Auditiva',
          'Física',
          'Intelectual',
          null,
          null
        ]),
        responsavelNome: faker.helpers.arrayElement([faker.person.fullName(), null]),
        endereco: faker.location.streetAddress(),
        hospitalId: 1,
        
        // Criar itens relacionados
        cateteres: {
          create: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => ({
            registroPaciente,
            tipoCateter: faker.helpers.arrayElement(tiposCateter),
            identificacaoStatus: faker.helpers.arrayElement(['Identificada_via_Central', 'Identificado', 'Nao_Identificado']),
            condicao: faker.helpers.arrayElement(condicoesCateter),
            turno: faker.helpers.arrayElement(turnos),
            situacao: faker.helpers.arrayElement(situacoes),
            dataInsercao: faker.date.recent({ days: 30 }),
            hospitalId: 1,
          }))
        },
        
        peliculas: {
          create: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => ({
            registroPaciente,
            modeloPelicula: faker.helpers.arrayElement(modelosPelicula),
            turno: faker.helpers.arrayElement(turnos),
            situacao: faker.helpers.arrayElement(situacoes),
            dataInsercao: faker.date.recent({ days: 30 }),
            hospitalId: 1,
          }))
        },
        
        danulas: {
          create: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => ({
            registroPaciente,
            turno: faker.helpers.arrayElement(turnos),
            situacao: faker.helpers.arrayElement(situacoes),
            dataInsercao: faker.date.recent({ days: 30 }),
            hospitalId: 1,
          }))
        },
        
        equipos: {
          create: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
            registroPaciente,
            tipo: faker.helpers.arrayElement(tiposEquipo),
            turno: faker.helpers.arrayElement(turnos),
            situacao: faker.helpers.arrayElement(situacoes),
            dataInsercao: faker.date.recent({ days: 30 }),
            hospitalId: 1,
          }))
        },
        
        medicacoesRisco: {
          create: Array.from({ length: faker.number.int({ min: 0, max: 2 }) }, () => ({
            registroPaciente,
            medicacao: faker.helpers.arrayElement([
              'Heparina',
              'Insulina',
              'Noradrenalina',
              'Dobutamina',
              'Vancomicina'
            ]),
            duracaoHoras: faker.number.int({ min: 6, max: 72 }),
            turno: faker.helpers.arrayElement(turnos),
            situacao: faker.helpers.arrayElement(situacoes),
            dataInsercao: faker.date.recent({ days: 30 }),
            hospitalId: 1,
          }))
        },
        
        evolucoes: {
          create: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
            registroPaciente,
            anotacao: faker.lorem.paragraph(),
            profissional: faker.person.fullName(),
            turno: faker.helpers.arrayElement(turnos),
            dataEvolucao: faker.date.recent({ days: 30 }),
            hospitalId: 1,
          }))
        }
      },
      include: {
        cateteres: true,
        peliculas: true,
        danulas: true,
        equipos: true,
        medicacoesRisco: true,
        evolucoes: true,
      }
    });

    console.log(`Paciente criado: ${paciente.nomeCompleto} (${paciente.registroPaciente})`);
    console.log(`- Cateteres: ${paciente.cateteres.length}`);
    console.log(`- Películas: ${paciente.peliculas.length}`);
    console.log(`- Danulas: ${paciente.danulas.length}`);
    console.log(`- Equipos: ${paciente.equipos.length}`);
    console.log(`- Medicações de risco: ${paciente.medicacoesRisco.length}`);
    console.log(`- Evoluções: ${paciente.evolucoes.length}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
