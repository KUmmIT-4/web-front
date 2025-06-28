export async function getJson() {
  const uri = "https://jsonplaceholder.typicode.com/todos/1";
  const data = await fetch(uri).then((res) => res.json());
  return data;
}

const BASE_URL = "http://192.168.106.182:3003/api";

interface RequestOptions<T = unknown> {
  params?: Record<string, string | number>;
  headers?: HeadersInit;
  body?: T;
}

export const fetchAPI = async <TBody = unknown, TResponse = unknown>(
  method: "get" | "post" | "put" | "delete" | "patch",
  endpoint: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> => {
  let url = `${BASE_URL}${endpoint}`;

  // GET params 처리
  if (options.params && method === "get") {
    const query = new URLSearchParams(
      options.params as Record<string, string>
    ).toString();
    url += `?${query}`;
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body:
      method !== "get" && options.body
        ? JSON.stringify(options.body)
        : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "API 요청 실패");
  }

  return res.json() as Promise<TResponse>;
};
