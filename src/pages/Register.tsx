// import React from 'react'
import Button from "@/components/Button";
import { useState } from "react";

const Register = () => {
  const [selectedGrade, setSeletedGrade] = useState("");
  const [selectedLevel, setSeletedLevel] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  let grades: string[] = ["브론즈", "실버", "골드", "그 이상"];
  let levels: string[] = ["1", "2", "3", "4", "5"];
  let languages: string[] = ["C", "C++", "Java", "JavaScript", "Python"];

  return (
    <div>
      <title>Reigister</title>
      <div className="pt-8 pb-8">
        <h1 className="text-3xl font-bold mb-6 pr-50 pb-6 whitespace-nowrap">
          회원가입
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <div className="pb-2 pr-80">아이디</div>
            <input
              className="w-96 h-14 pl-4 rounded-lg border-1 border-solid border-slate-300
        text-slate-500"
              type="text"
              placeholder="아이디를 입력해주세요."
            />
          </div>
          <div>
            <div className="pb-2 pr-80">비밀번호</div>
            <input
              className="w-96 h-14 pl-4 rounded-lg border-1 border-solid border-slate-300
        text-slate-500"
              type="text"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
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
      <Button className="bg-slate-300 text-white mt-20" icon="" label="다음" />
    </div>
  );
};

export default Register;
