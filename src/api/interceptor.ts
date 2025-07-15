export async function handleResponse<T = any>(response: Response): Promise<{ status: number, data: T }> {
  const status = response.status;

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error || "Erro ao carregar dados";

    if (typeof window !== "undefined") {
      const encodedMessage = encodeURIComponent(message);

      if (response.status === 500) {
        window.location.href = `/internal-error?mensagem=${encodedMessage}`;
        throw new Error("Redirecionando para erro interno");
      }

      if (response.status === 404) {
        window.location.href = `/not-found?mensagem=${encodedMessage}`;
        throw new Error("Redirecionando para página não encontrada");
      }

      if (response.status === 401) {
        window.location.href = `/unauthorized?mensagem=${encodedMessage}`;
        throw new Error("Redirecionando para página de não autorizado");
      }
    }

    throw new Error(message);
  }

  const data = await response.json();
  
  return {
    status,
    data
  };
}
