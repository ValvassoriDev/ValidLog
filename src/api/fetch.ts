import { handleResponse } from "./interceptor";

export async function api<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<{ status: number, data: T }> {
  const method = init?.method || "GET";

  if (method === "POST" || method === "PUT") {
    if (!init?.body) {
      throw new Error("Corpo da requisição não especificado para POST ou PUT");
    }
  }

  const response = await fetch(input, init);

  return handleResponse<T>(response);
}
