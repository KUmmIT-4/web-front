// import React from "react";
import Button from "@/components/Button";
import { useState, useEffect, type ChangeEvent } from "react";
import Confirm from "@/components/ui/confirm";
import Input from "@/components/Input";

const Register = () => {
  const [selectedGrade, setSeletedGrade] = useState("");
  const [selectedLevel, setSeletedLevel] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  let grades: string[] = ["브론즈", "실버", "골드", "그 이상"];
  let levels: string[] = ["1", "2", "3", "4", "5"];
  let languages: string[] = ["C", "C++", "Java", "JavaScript", "Python"];

  const [pw, setPw] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [isPassword, setIsPassword] = useState<boolean | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(false);

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
      return; //todo: 10글자 막기
    } else {
      setPwMessage("사용가능한 비밀번호입니다");
      setIsPassword(true);
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);
  function onChangeBtn() {
    setShowConfirm(true);
  }

  useEffect(() => {
    const valid: boolean | null =
      // isId 검사도 필요함
      isPassword &&
      selectedGrade !== "" &&
      selectedLevel !== "" &&
      selectedLang !== "";
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
            <div className="pb-2 pr-80">아이디</div>
            <input
              className="w-96 h-14 pl-4 rounded-lg border-1 border-solid border-slate-300
        text-slate-500"
              type="text"
              placeholder="아이디를 입력해주세요."
            />
            {/* 아이디 유효성 검사 추가 필요*/}
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
                className="w-42 h-14 border-1 border-solid border-slate-300 rounded-[4vw] cursor-pointer"
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
                className="w-42 h-14 border-1 border-solid border-slate-300 rounded-[4vw] cursor-pointer"
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
              className="w-96 h-14 border-1 border-solid border-slate-300 rounded-[4vw] cursor-pointer"
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
        onClick={isValid ? onChangeBtn : undefined}
        // onClick={onChangeBtn}
        //disabled={!isValid}
      />
    </div>
  );
};

export default Register;
