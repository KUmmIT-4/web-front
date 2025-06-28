import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userInfo from "@/api/login.tsx";

const Login = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  // const [cookies, setCookies, removeCookies] = useCookies(["token"]);

  const onChangeId = (e: any) => {
    const currentId = e.target.value;
    setId(currentId);
  };

  const onChangePw = (e: any) => {
    const currentPw = e.target.value;
    setPw(currentPw);
  };

  useEffect(() => {
    const valid: boolean = id !== "" && pw !== "";
    setIsValid(valid);
  }, [pw, id, isValid]);

  const navigate = useNavigate();
  const handleLog = async () => {
    if (!isValid) return; //유효하지 않으면 return

    try {
      const user = await userInfo({ username: id, password: pw }); //id, pw 보내서 로그인 시도
      if (user) {
        console.log("불러오기 성공");
        navigate("/home");
      }
    } catch (error) {
      console.error("불러오기 실패");
    }
  };

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-col pt-48">
        <h1 className="text-blue-500 text-5xl font-bold ">하루코딩</h1>
      </div>
      <div className="flex flex-col gap-3">
        <input
          className="w-96 h-16 pl-4 rounded-lg border-1 border-solid border-slate-300
        font-bold text-slate-500"
          type="text"
          placeholder="아이디"
          onChange={onChangeId}
        />
        <input
          className="w-96 h-16 pl-4 rounded-lg border-1 border-solid border-slate-300
        font-bold text-slate-500"
          type="text"
          placeholder="비밀번호"
          onChange={onChangePw}
        />
        <Button
          className={`mt-6 bg-blue-200 rounded-lg 
          `}
          label="로그인"
          onClick={handleLog}
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

export default Login;
