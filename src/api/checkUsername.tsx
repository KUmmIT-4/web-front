const API_URL = import.meta.env.VITE_API_URL || "";

const checkUsername = async (username: string): Promise<boolean> => {
  const response = await fetch(`${API_URL}/api/users/check-username`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error("아이디 중복 확인 실패");
  }

  const data = await response.json();
  return data.exists; // true or false
};

export default checkUsername;
