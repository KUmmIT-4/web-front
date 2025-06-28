interface User {
  username: string;
  password: string;
  tier: string;
  level: number;
  language: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const newUserInfo = async ({
  username,
  password,
  tier,
  level,
  language,
}: User): Promise<User> => {
  //tier 유효성 검사
  const validTiers = ["gold", "silver", "bronze", "expert"];
  if (!validTiers.includes(tier.toLowerCase())) {
    throw new Error(`유효하지 않은 tier 값입니다.`);
  }

  //language 유효성 검사
  const validLanguages = ["C", "CPP", "PYTHON", "JAVA", "JAVASCRIPT"];
  const upperLang = language.toUpperCase();
  if (!validLanguages.includes(upperLang)) {
    throw new Error(`유효하지 않은 language 값입니다.`);
  }

  //response
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //   username: "kuit",
      //   password: "aaaaa",
      //   tier: "BRONZE",
      //   level: 1,
      //   language: "JAVA",
      username,
      password,
      tier: tier.toLowerCase(),
      level,
      language: upperLang,
    }),
  });

  if (!response.ok) {
    throw new Error("401: 아이디 또는 비밀번호가 올바르지 않습니다");
  }
  const data = await response.json(); //응답 data json 형식으로 파싱
  return data as User; //User type 으로 반환
};

export default newUserInfo;
