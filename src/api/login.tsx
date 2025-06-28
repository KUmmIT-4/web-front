interface User {
  username: string;
  password: string;
  tier?: string;
  level?: number;
  language?: string;
}

const API_URL = import.meta.env.VITE_API_URL || "";

const userInfo = async ({ username, password }: User): Promise<User> => {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include", // CORS 문제로 인해 일시적으로 제거
    body: JSON.stringify({
      username: "kuit",
      password: "aaaaa",
    }),
  });

  if (!response.ok) {
    throw new Error("401: 아이디 또는 비밀번호가 올바르지 않습니다");
  }
  const data = await response.json(); //응답 data json 형식으로 파싱
  return data as User; //User type 으로 반환
};

export default userInfo;
