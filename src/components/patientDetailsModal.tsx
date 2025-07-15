//@ts-nocheck
"use client";

import { IPacienteInterface } from "@/interfaces/IPacienteInterface";
import { formatDate } from "@/utils/formatDate";
import {
  getSituacaoColor,
  getStatusColor,
  getTipoCateterColor,
  getTipoSanguineoColor,
} from "@/utils/getColors";
import React, { useState, useEffect, useCallback } from "react";
import {
  sexoLabels,
  tipoCateterLabels,
  identificacaoStatusLabels,
  condicaoLabels,
  tipoEquipoLabels,
  turnoLabels,
  situacaoLabels,
  modeloPeliculaLabels,
} from "@/constants/labels";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import { DialogDefault } from "./Modal/Modal";


import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { CustomButton } from "./Button/Button";
import { THCustom } from "./THCustom/THCustom";

import {
  EVOLUCAO_FIELDS,
  EQUIPO_FIELDS,
  PELICULA_FIELDS,
  CATETER_FIELDS,
  DANULA_FIELDS,
  MEDICACAO_RISCO_FIELDS,
} from "@/constants/formFields";


import { useUser } from "../../src/contexts/userContext";
import { useRouter } from "next/navigation";
import { useShowForm } from "../hooks/useShowForm/useShowForm";

interface PatientDetailsModalProps {
  paciente: IPacienteInterface | null;
  onClose: () => void;
}

export function PatientDetailsModal({
  paciente,
  onClose,
}: PatientDetailsModalProps) {
  const { userData } = useUser();
  const router = useRouter();
  const [timeSince, setTimeSince] = useState<{ [key: string]: string }>({});
  const { handleOpen, ShowForm, open } = useShowForm({ patient: paciente })


  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSince((prev) => ({ ...prev }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeSince = (dateString: string) => {
    const now = new Date();
    const pastDate = new Date(dateString);
    const diff = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

    const days = Math.floor(diff / (24 * 3600));
    const hours = Math.floor((diff % (24 * 3600)) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
  };

  const renderDateTimeWithElapsed = (dateString: string) => {
    if (!timeSince[dateString]) {
      setTimeSince((prev) => ({
        ...prev,
        [dateString]: calculateTimeSince(dateString),
      }));
    }

    return (
      <div className="flex flex-col">
        <span>{formatDate(dateString)}</span>
        <span className="text-xs text-muted-foreground">
          {timeSince[dateString]}
        </span>
      </div>
    );
  };

  if (!paciente) return null;

  const goToEditPatient = () => {
    router.push(`/pacientes/formulario/editar/${paciente.id}`)
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-scroll no-scrollbar  duration-300"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-scroll  border border-border "
        onClick={(e) => e.stopPropagation()}
      >
        {open ? (
          <ShowForm />
        ) : (
          <>
            <div className="top-0 bg-primary text-primary-foreground p-6 rounded-t-xl no-scrollbar">
              <div className="flex justify-between items-start no-scrollbar">
                <div>
                  <h2 className="text-2xl font-bold">
                    {paciente.nomeCompleto}{" "}
                    <span className="font-medium">
                      ({paciente.registroPaciente})
                    </span>
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 rounded-md text-sm font-medium bg-accent text-accent-foreground">
                      {sexoLabels[paciente.sexo]}
                    </span>
                  </div>
                </div>
                <CustomButton
                  title="Editar"
                  variant="secondary"
                  onClick={goToEditPatient}
                />
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-popover p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">
                    Informações Pessoais
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Nome Abreviado
                      </p>
                      <p className="text-sm font-medium text-muted-foreground">
                        {paciente.abreviacaoNome}
                      </p>
                    </div>

                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-popover p-4 rounded-lg border border-border">
                    <h3 className="font-semibold text-lg mb-3 text-foreground">
                      Informações Adicionais
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Resgistrado por:
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">
                          {paciente.insertedBy || "Não informado"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Hospital
                        </p>
                        <p className="text-sm font-medium text-muted-foreground">
                          {paciente.hospital.nome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-popover p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-4 text-foreground justify-between flex items-center">
                  <p>Cateteres</p>
                  <CustomButton
                    title="+"
                    onClick={() => handleOpen("cateter")}
                  />
                </h3>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <THCustom title="Tipo" />
                        <THCustom title="Identificação" />
                        <THCustom title="Condição" />
                        <THCustom title="Turno" />
                        <THCustom title="Situação" />
                        <THCustom title="Data de Inserção" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paciente.cateteres.map((cateter) => (
                        <tr
                          key={cateter.id}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTipoCateterColor(
                                cateter.tipoCateter
                              )}`}
                            >
                              {tipoCateterLabels[cateter.tipoCateter]}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {
                              identificacaoStatusLabels[
                              cateter.identificacaoStatus
                              ]
                            }
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {condicaoLabels[cateter.condicao]}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {turnoLabels[cateter.turno]}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSituacaoColor(
                                cateter.situacao
                              )}`}
                            >
                              {situacaoLabels[cateter.situacao]}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {renderDateTimeWithElapsed(cateter.dataInsercao)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-popover p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-4 text-foreground justify-between flex items-center">
                  <p>Películas</p>
                  <CustomButton
                    title="+"
                    disabled={!paciente.cateteres.length}
                    onClick={() => handleOpen("pelicula")}
                  />
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <THCustom title="Modelo" />
                        <THCustom title="Turno" />
                        <THCustom title="Situação" />
                        <THCustom title="Data de Inserção" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paciente.peliculas.map((pelicula) => (
                        <tr
                          key={pelicula.id}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-foreground">
                            {modeloPeliculaLabels[pelicula.modeloPelicula]}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {turnoLabels[pelicula.turno]}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSituacaoColor(
                                pelicula.situacao
                              )}`}
                            >
                              {situacaoLabels[pelicula.situacao]}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {renderDateTimeWithElapsed(pelicula.dataInsercao)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-popover p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-4 text-foreground justify-between flex items-center">
                  <p>Danulas</p>
                  <CustomButton
                    title="+"
                    disabled={!paciente.cateteres.length}
                    onClick={() => handleOpen("danulas")}
                  />
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <THCustom title="Turno" />
                        <THCustom title="Situação" />
                        <THCustom title="Data de Inserção" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paciente.danulas.map((danula) => (
                        <tr
                          key={danula.id}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-foreground">
                            {turnoLabels[danula.turno]}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSituacaoColor(
                                danula.situacao
                              )}`}
                            >
                              {situacaoLabels[danula.situacao]}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {renderDateTimeWithElapsed(danula.dataInsercao)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-popover p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-4 text-foreground justify-between flex items-center">
                  <p>Equipos</p>
                  <CustomButton
                    title="+"
                    disabled={!paciente.cateteres.length}
                    onClick={() => handleOpen("equipos")}
                  />
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <THCustom title="Tipo" />
                        <THCustom title="Turno" />
                        <THCustom title="Situação" />
                        <THCustom title="Data de Inserção" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paciente.equipos.map((equipo) => (
                        <tr
                          key={equipo.id}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-foreground">
                            {tipoEquipoLabels[equipo.tipo]}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {turnoLabels[equipo.turno]}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getSituacaoColor(
                                equipo.situacao
                              )}`}
                            >
                              {situacaoLabels[equipo.situacao]}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {renderDateTimeWithElapsed(equipo.dataInsercao)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>



              <div className="bg-popover p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-4 text-foreground justify-between flex items-center">
                  <p>Medicações de Risco</p>
                  <CustomButton
                    disabled={!paciente.cateteres.length}
                    title="+"
                    onClick={() => handleOpen("medicacao")}
                  />
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <THCustom title="Medicação" />
                        <THCustom title="Duração (horas)" />
                        <THCustom title="Turno" />
                        <THCustom title="Data de Inserção" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paciente.medicacoesRisco.map((medicacao) => (
                        <tr
                          key={medicacao.id}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-foreground">
                            {medicacao.medicacao}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {medicacao.duracaoHoras}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {turnoLabels[medicacao.turno]}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {renderDateTimeWithElapsed(medicacao.dataInsercao)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-popover p-4 rounded-lg border border-border">
                <h3 className="font-semibold text-lg mb-4 text-foreground justify-between flex items-center">
                  <p>Evoluções</p>
                  <CustomButton
                    title="+"
                    onClick={() => handleOpen("evolucao")}
                  />
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <THCustom title="Anotação" />
                        <THCustom title="Profissional" />
                        <THCustom title="Turno" />
                        <THCustom title="Data de Inserção" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paciente.evolucoes.map((evolucao) => (
                        <tr
                          key={evolucao.id}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          <td className="py-3 px-4 text-foreground">
                            {evolucao.anotacao}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {evolucao.profissional}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {turnoLabels[evolucao.turno]}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {renderDateTimeWithElapsed(evolucao.dataEvolucao)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
