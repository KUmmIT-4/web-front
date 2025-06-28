const serverUrl = "http://192.168.106.182:3003";

export async function getJson() {
  const uri = serverUrl + "/api/attempts";
  const data = await fetch(uri, {
    // fetch 요청에 옵션 추가
    method: "POST", // HTTP 메소드를 POST로 변경
    headers: {
      // HTTP 헤더 설정
      session_id: "1111", // session_id를 헤더에 추가
      "Content-Type": "application/json", // Content-Type 설정 (JSON 형태)
    },
    body: JSON.stringify({
      tier: "BRONZE",
      level: 1,
      language: "CPP",
    }), // body에 빈 JSON 객체 전달 (필요에 따라 데이터 추가)
  }).then((res) => res.json());
  return data;
}

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
  let url = `${serverUrl}${endpoint}`;

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
