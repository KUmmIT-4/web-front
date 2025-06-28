// import React from "react";
import Button from "@/components/Button";
import { useState, useEffect, type ChangeEvent } from "react";
import Confirm from "@/components/ui/confirm";
import Input from "@/components/Input";
import newUserInfo from "@/api/register";
import checkUsername from "@/api/checkUsername";

const Register = () => {
  const [selectedGrade, setSeletedGrade] = useState("");
  const [selectedLevel, setSeletedLevel] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  let grades: string[] = ["브론즈", "실버", "골드", "그 이상"];
  let levels: string[] = ["1", "2", "3", "4", "5"];
  let languages: string[] = ["C", "C++", "Java", "JavaScript", "Python"];

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [isId, setIsId] = useState<boolean | null>(null);
  const [isPassword, setIsPassword] = useState<boolean | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(false);

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    const currentId = e.target.value;
    setId(currentId);
    setIsId(null); // 입력 변경 시 검증 상태 초기화
    setIdMessage("");
  };

  const onBlurId = async () => {
    if (id === "") return;
    try {
      const exists = await checkUsername(id);
      if (exists) {
        // console.log("ㄴㄹㄴㄷㄹ");
        setIdMessage("이미 존재하는 아이디입니다");
        setIsId(false);
      } else {
        // console.log("ㄴㄹㄷㄴ");
        setIdMessage("사용 가능한 아이디입니다");
        setIsId(true);
      }
    } catch (error) {
      console.log("fail");
      setIdMessage("아이디 중복 확인 실패");
      setIsId(false);
    }
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPw = e.target.value;
    setPw(currentPw);
    const pwRegExp = /^[a-zA-Z0-9]+$/; //정규 표현식(영문/숫자)

    if (!pwRegExp.test(currentPw)) {
      setPwMessage("영문, 숫자만 가능합니다");
      setIsPassword(false);
    } else if (currentPw.length > 10) {
      setPwMessage("10글자 이내만 가능합니다");
      setIsPassword(false);
      return;
    } else {
      setPwMessage("사용가능한 비밀번호입니다");
      setIsPassword(true);
    }
  };

  const addInfo = async (): Promise<boolean> => {
    try {
      const newUser = await newUserInfo({
        username: id,
        password: pw,
        tier: mapTier(selectedGrade),
        level: Number(selectedLevel),
        language: selectedLang.toUpperCase(),
      });
      console.log("회원가입 성공:", newUser);
      return true;
    } catch (error) {
      console.error("회원가입 실패:", error);
      return false;
    }
  };

  //tier 함수
  const mapTier = (korTier: string) => {
    switch (korTier) {
      case "브론즈":
        return "bronze";
      case "실버":
        return "silver";
      case "골드":
        return "gold";
      case "그 이상":
        return "expert";
      default:
        return "";
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);
  async function onChangeBtn() {
    const success = await addInfo();
    if (success) {
      setShowConfirm(true);
    } else {
      console.error("회원가입 실패: Confirm 모달 띄우지 않음");
      // 실패 알림을 UI에 띄우고 싶다면 여기서 처리
    }
  }

  useEffect(() => {
    const valid: boolean | null =
      // isId 검사도 필요함
      // isId &&
      // isPassword &&
      selectedGrade !== "" && selectedLevel !== "" && selectedLang !== "";
    setIsValid(valid);
  }, [pw, selectedGrade, selectedLevel, selectedLang, isPassword]);

  return (
    <div className="w-full">
      <div>
        {showConfirm && (
          <Confirm
            onClose={() => {
              setShowConfirm(false);
            }}
          />
        )}
      </div>
      <title>Reigister</title>
      <div className="pt-8 pb-8">
        <h1 className="text-3xl font-bold mb-6 pr-50 pb-6 whitespace-nowrap">
          회원가입
        </h1>
        <div className="flex flex-col gap-4">
          <form>
            <div className="w-96 pl-2 mb-2 text-left">
              <span className="pb-4 ml-18">아이디 </span>
              <span
                className={`${
                  pw === ""
                    ? "text-white"
                    : isId
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
              >
                {idMessage}
              </span>
            </div>
            <input
              className="w-96 h-14 pl-4 rounded-lg border-1 border-solid border-slate-300
        text-slate-500"
              type="text"
              placeholder="아이디를 입력해주세요."
              value={id}
              onChange={onChangeId}
              onBlur={onBlurId}
            />
          </form>
          <form className="flex flex-col w-full items-center">
            <div className="flex items-center gap-2 pb-2">
              <div className="w-96 pl-2 text-left">
                <span>비밀번호 </span>
                <span
                  className={`${
                    pw === ""
                      ? "text-white"
                      : isPassword
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                >
                  {pwMessage}
                </span>
              </div>
            </div>
            <div>
              <Input
                className={`w-96 h-14 pl-4 rounded-lg 
              border border-solid
        text-slate-500 focus:outline-none
  ${
    pw === ""
      ? "border-slate-300"
      : isPassword
      ? "border-blue-500"
      : "border-red-500"
  }`}
                onChange={onChangePw}
              />
            </div>
          </form>

          <div>
            <div className="pb-2 pr-80">코딩 실력</div>
            <div className="flex justify-center flex gap-13 px-5">
              <select
                className="w-42 h-14 border-1 border-solid border-slate-300 rounded-[1vw] cursor-pointer"
                style={{ fontSize: "1.125rem", padding: "0.75rem" }}
                value={selectedGrade}
                onChange={(e) => setSeletedGrade(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  등급
                </option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              <select
                className="w-42 h-14 border-1 border-solid border-slate-300 rounded-[1vw] cursor-pointer"
                style={{ fontSize: "1.125rem", padding: "0.75rem" }}
                value={selectedLevel}
                onChange={(e) => setSeletedLevel(e.target.value)}
              >
                <option value="" disabled selected hidden>
                  레벨
                </option>
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="pb-2 pr-80">코딩언어</div>
            <select
              className="w-96 h-14 border-1 border-solid border-slate-300 rounded-[1vw] cursor-pointer"
              style={{
                fontSize: "1.125rem",
                padding: "0.75rem",
              }}
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              <option value="" disabled selected hidden>
                언어
              </option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <Button
        className={`${
          isValid
            ? "bg-blue-500 cursor-pointer"
            : "bg-slate-300 !cursor-default"
        } text-white mt-20 focus:outline-none`}
        label="다음"
        // onClick={isValid ? onChangeBtn : undefined}
        onClick={onChangeBtn}
        disabled={!isValid}
      />
    </div>
  );
};

export default Register;
