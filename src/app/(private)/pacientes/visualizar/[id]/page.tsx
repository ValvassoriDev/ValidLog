"use client";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { Cateter, Danula, Equipo, Pelicula, Situacao } from "@prisma/client";
import AuthGuard from "@/contexts/authGuard";
import { Spinner } from "@/components/spinner";
import { BASE_ROUTES_ROLES } from "@/constants/baseRoutesRoles";
import { useShowPacienteId } from "@/hooks/useShowPacienteId";
import { sexoLabels } from "@/constants/labels";
import { formatDate } from "@/utils/formatDate";
import { HospitalCard } from "@/components/hospitalCard";
import { CateterCard } from "@/components/cateterCard";
import { DanulaCard } from "@/components/danulaCard";
import { EquipoCard } from "@/components/equipoCard";
import { PeliculaCard } from "@/components/peliculaCard";

export default function VisualizarPacientePagina() {
  const { paciente, loading, error } = useShowPacienteId();
  const router = useRouter();

  const [cateteres, setCateteres] = useState<Cateter[]>([]);
  const [danulas, setDanulas] = useState<Danula[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  useEffect(() => {
    if (paciente) {
      setCateteres(paciente.cateteres || []);
      setDanulas(paciente.danulas || []);
      setEquipos(paciente.equipos || []);
      setPeliculas(paciente.peliculas || []);
    }
  }, [paciente]);

  const handleRemoveDanula = async (id: string) => {
    setIsRemoving(true);
    try {
      const response = await fetch(`/api/danulas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ situacao: Situacao.Removido }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao remover a danula");
      }

      setDanulas((prevDanulas) =>
        prevDanulas.filter((danula: Danula) => danula.id !== id)
      );
    } catch (err: any) {
      console.error("Erro ao remover a danula:", err);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleRemoveCateter = async (id: string) => {
    setIsRemoving(true);
    try {
      const response = await fetch(`/api/cateteres/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ situacao: Situacao.Removido }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao remover o cateter");
      }

      setCateteres((prevCateteres) =>
        prevCateteres.filter((cateter: Cateter) => cateter.id !== id)
      );
    } catch (err: any) {
      console.error("Erro ao remover o cateter:", err);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleRemoveEquipo = async (id: string) => {
    setIsRemoving(true);
    try {
      const response = await fetch(`/api/equipos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ situacao: Situacao.Removido }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao remover o equipo");
      }

      setEquipos((prevEquipos) =>
        prevEquipos.filter((equipo: any) => equipo.id !== id)
      );
    } catch (err: any) {
      console.error("Erro ao remover o equipo:", err);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleRemovePelicula = async (id: string) => {
    setIsRemoving(true);
    try {
      const response = await fetch(`/api/peliculas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ situacao: Situacao.Removido }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao remover a pelicula");
      }

      setPeliculas((prevPeliculas) =>
        prevPeliculas.filter((pelicula: Pelicula) => pelicula.id !== id)
      );
    } catch (err: any) {
      console.error("Erro ao remover a pelicula:", err);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleEdit = () => {
    if (paciente) {
      router.push(`/pacientes/formulario/editar/${paciente.id}`);
    }
  };

  const filterBySituacao = (items: any[]) => {
    return items.filter(
      (item) =>
        item.situacao === Situacao.Manter || item.situacao === Situacao.Atencao
    );
  };

  return (
    <AuthGuard allowedRoles={BASE_ROUTES_ROLES.pacientes}>
      <div className="bg-background min-h-screen py-8 px-4">
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner />
          </div>
        ) : error ? (
          <div>Erro ao carregar paciente.</div>
        ) : !paciente ? (
          <div>Paciente não encontrado.</div>
        ) : (
          <div className="max-w-4xl mx-auto bg-card shadow-lg p-6 rounded-lg">
            <h1 className="text-2xl font-bold text-primary mb-4">
              Relatório do Paciente
            </h1>
            <div className="space-y-6">
              <InfoSection title="Informações Gerais">
                <p>
                  <strong>Registro:</strong> {paciente.registroPaciente}
                </p>
                <p>
                  <strong>Nome Completo:</strong> {paciente.nomeCompleto}
                </p>
                <p>
                  <strong>Sexo:</strong> {sexoLabels[paciente.sexo] || "Outro"}
                </p>
                <p>
                  <strong>Data de Registro:</strong>{" "}
                  {formatDate(paciente.createdAt)}
                </p>
              </InfoSection>

              <InfoSection title="Informações do Hospital">
                {paciente.hospital ? (
                  <HospitalCard
                    hospital={paciente.hospital}
                    loading={loading}
                  />
                ) : (
                  <p>Hospital não informado.</p>
                )}
              </InfoSection>

              {renderListSection(
                "Cateteres",
                filterBySituacao(cateteres),
                (item) => (
                  <CateterCard
                    key={item.id}
                    cateter={item}
                    loading={loading}
                    getLabel={(value, labels) =>
                      labels[value] || "Desconhecido"
                    }
                    isRemoving={isRemoving}
                    handleRemoveCateter={() => handleRemoveCateter(item.id)}
                  />
                )
              )}

              {renderListSection(
                "Equipos",
                filterBySituacao(equipos),
                (item) => (
                  <EquipoCard
                    key={item.id}
                    equipo={item}
                    loading={loading}
                    getLabel={(value, labels) =>
                      labels[value] || "Desconhecido"
                    }
                    isRemoving={isRemoving}
                    handleRemoveEquipo={() => handleRemoveEquipo(item.id)}
                  />
                )
              )}

              {renderListSection(
                "Peliculas",
                filterBySituacao(peliculas),
                (item) => (
                  <PeliculaCard
                    key={item.id}
                    pelicula={item}
                    loading={loading}
                    getLabel={(value, labels) =>
                      labels[value] || "Desconhecido"
                    }
                    isRemoving={isRemoving}
                    handleRemovePelicula={() => handleRemovePelicula(item.id)}
                  />
                )
              )}

              {renderListSection(
                "Danulas",
                filterBySituacao(danulas),
                (item) => (
                  <DanulaCard
                    key={item.id}
                    danula={item}
                    loading={loading}
                    getLabel={(value, labels) =>
                      labels[value] || "Desconhecido"
                    }
                    isRemoving={isRemoving}
                    handleRemoveDanula={() => handleRemoveDanula(item.id)}
                  />
                )
              )}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleEdit}
                className="bg-primary text-primary-foreground py-2 px-6 rounded-md hover:bg-primary-dark transition-all"
              >
                Editar Dados
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}

const InfoSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h2 className="text-lg font-semibold text-primary">{title}</h2>
    {children}
  </div>
);

const renderListSection = (
  title: string,
  items: any[],
  renderItem: (item: any) => JSX.Element
) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-primary">{title}</h3>
    <div className="grid grid-cols-1 gap-4">
      {items.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum {title.toLowerCase()} encontrado.
        </p>
      ) : (
        items.map(renderItem)
      )}
    </div>
  </div>
);
