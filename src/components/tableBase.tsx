import { useRouter } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { CustomButton } from "./Button/Button";

interface Column {
  title: string;
  field?: string | string[];
  customField?: (record: any) => React.ReactNode;
}

interface RecordsListProps {
  title: string;
  records: any[];
  columns: Column[];
  onDetails?: (id: string) => void;
  onEdit?: (id: string) => void;
  newRecordUrl?: string;
  newRecordButtonText?: string;
  error?: string | null;
  loading?: boolean;

  page?: number;
  totalPages?: number;
  onPageChange?: (newPage: number) => void;
}

export function TableBase({
  title,
  records,
  columns,
  onDetails,
  onEdit,
  error,
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
}: RecordsListProps) {
  const router = useRouter();

  function getFieldValue(record: any, field?: string | string[]) {
    if (!field) return "";
    if (typeof field === "string") return record[field];
    return field.reduce((acc, key) => acc?.[key], record);
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto bg-card rounded-lg shadow-md overflow-hidden border border-border">
        <div className="p-6 bg-primary border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-2xl text-primary-foreground font-semibold">
              {title}
            </h2>
            <p className="text-xl text-primary-foreground font-semibold">
              {records.length}{" "}
              {records.length === 1 ? "registro" : "registros"}  {records.length === 1 ? "encontrado" : "encontrados"}
            </p>
          </div>
        </div>

        {error && (
          <div className="m-6 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <div className="p-6 overflow-x-auto">
          {loading ? (
            <Spinner />
          ) : records.length > 0 ? (
            <>
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    {columns.map((column, idx) => (
                      <th
                        key={idx}
                        className="p-3 text-left text-sm text-muted-foreground uppercase"
                      >
                        {column.title}
                      </th>
                    ))}
                    {(onDetails || onEdit) && (
                      <th className="p-3 text-left text-sm text-muted-foreground uppercase">
                        Ações
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="hover:bg-muted">
                      {columns.map((column, idx) => (
                        <td key={idx} className="p-3 text-sm">
                          {column.customField
                            ? column.customField(record)
                            : getFieldValue(record, column.field)}
                        </td>
                      ))}
                      {(onDetails || onEdit) && (
                        <td className="p-3 text-sm flex gap-2">
                          {onDetails && (
                            <CustomButton
                              title="Detalhes"
                              variant="primary"
                              onClick={() => onDetails(record.id)}
                            />
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(record.id)}
                              className="text-blue-600 hover:underline"
                            >
                              Editar
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-6">
                  <button
                    onClick={() => onPageChange?.(page - 1)}
                    disabled={page <= 1}
                    className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <span className="text-sm text-muted-foreground">
                    Página {page} de {totalPages}
                  </span>
                  <button
                    onClick={() => onPageChange?.(page + 1)}
                    disabled={page >= totalPages}
                    className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              Nenhum registro encontrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
