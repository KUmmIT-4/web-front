import { useState } from "react";
import Button from "./Button";

const selected = () => {
  const [selectedGrade, setSeletedGrade] = useState("실버");
  const [selectedLevel, setSeletedLevel] = useState("2");
  const [selectedLang, setSelectedLang] = useState("C++");
  let grades: string[] = ["브론즈", "실버", "골드", "그 이상"];
  let levels: string[] = ["1", "2", "3", "4", "5"];
  let languages: string[] = ["C++", "Java", "JavaScript", "Python"];

  return (
    <div className="max-w-xs mx-auto p-4 flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold">연속도전 3일차</h2>
      {/*useState?*/}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-2">
          <select
            className="flex-1 border p-3 text-lg rounded-lg appearance-none"
            style={{ fontSize: "1.125rem", padding: "0.75rem" }}
            value={selectedGrade}
            onChange={(e) => setSeletedGrade(e.target.value)}
          >
            {grades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
          <select
            className="flex-1 border p-3 text-lg rounded-lg appearance-none"
            style={{ fontSize: "1.125rem", padding: "0.75rem" }}
            value={selectedLevel}
            onChange={(e) => setSeletedLevel(e.target.value)}
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
        <select
          className="flex-1 border p-3 text-lg rounded-lg appearance-none"
          style={{ fontSize: "1.125rem", padding: "0.75rem" }}
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2 w-full mt-2">
        {/* 버튼 */}
        <Button icon="" label="코딩 문제풀이" />
        <Button icon="" label="복습하기" />
        <Button icon="" label="순위보기" />
        {/* css Tailwind 쓸건지 결정 필요 -> color property 이름 결정*/}
      </div>
    </div>
  );
};

export default selected;
