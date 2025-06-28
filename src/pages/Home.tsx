import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/header";
// import Button from "@/components/Button";
import SelectItems from "@/components/constants/selectItems";
import pen from "@/assets/images/pen.png";
import timer from "@/assets/images/timer.png";
import trophy from "@/assets/images/trophy.png";
import codeIcon from "@/assets/images/codeIcon.png";
import nextArrow from "@/assets/images/next-arrow.png";

const tierOptions = [
  { label: "브론즈", value: "bronze" },
  { label: "실버", value: "silver" },
  { label: "골드", value: "gold" },
  { label: "그 이상", value: "beyond" },
];
const labelOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];
const languageOptions = [
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "Python", value: "py" },
  { label: "Java", value: "jv" },
  { label: "JavaScript", value: "js" },
];

const Home = () => {
  const navigate = useNavigate();

  const [conti, setConti] = useState(false); // 풀고 있는 문제 유무

  const gotoRank = () => {
    navigate("/rank");
  };

  return (
    <>
      <Header />
      <main className="w-full px-4 mx-auto">
        <div>
          <p className="font-bold text-2xl text-black pt-5.5 pb-7">
            연속도전 3일차
          </p>
          <div className="flex gap-7 mb-3">
            <SelectItems placeholder="등급" options={tierOptions} />
            <SelectItems placeholder="라벨" options={labelOptions} />
          </div>
          <div className="mb-3.5 flex">
            <SelectItems placeholder="언어" options={languageOptions} />
          </div>
          <div className="flex flex-col gap-3.5 mb-7">
            {/* <Button
            icon={<img src={pen} className="size-4.5" />}
            label="코딩 문제풀기"
            className="bg-[var(--primary)] w-full"
          ></Button> */}
            <button className="bg-[var(--primary)] w-full flex h-14 justify-center items-center gap-2 rounded-2xl">
              <span>
                <img src={pen} className="size-4.5" />
              </span>
              <span className="text-white font-bold">
                {conti ? "계속해서 풀기" : "코딩 문제풀기"}
              </span>
            </button>
            <button className="bg-[var(--disabled)] w-full flex h-14 justify-center items-center gap-2 rounded-2xl">
              <span>
                <img src={timer} className="size-4.5" />
              </span>
              <span className="font-bold">복습하기</span>
            </button>
            <button
              className="bg-[var(--disabled)] w-full flex h-14 justify-center items-center gap-2 rounded-2xl"
              onClick={gotoRank}
            >
              <span>
                <img src={trophy} className="size-4.5" />
              </span>
              <span className="font-bold">순위보기</span>
            </button>
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold text-2xl text-start">오늘의 도전기록</p>
          <div className="flex flex-col gap-3.5">
            <div className="flex bg-[#fafafb] h-20 items-center gap-4 relative px-2.5 rounded-2xl">
              <img src={codeIcon} className="size-11" />
              <div className="flex flex-col">
                <p className="text-start">백준 1051번, 양배추~ [진행중]</p>
                <p className="text-start text-[#505866]">
                  난이도 : 실버 2 언어 : C++
                </p>
              </div>

              <img src={nextArrow} className="w-2 h-3.5 absolute right-6" />
            </div>

            <div className="flex bg-[#fafafb] h-20 items-center gap-4 relative px-2.5 rounded-2xl">
              <img src={codeIcon} className="size-11" />
              <div className="flex flex-col">
                <p className="text-start">백준 1051번, 양배추~ [진행중]</p>
                <p className="text-start text-[#505866]">
                  난이도 : 실버 2 언어 : C++
                </p>
              </div>

              <img src={nextArrow} className="w-2 h-3.5 absolute right-6" />
            </div>

            <div className="flex bg-[#fafafb] h-20 items-center gap-4 relative px-2.5 rounded-2xl">
              <img src={codeIcon} className="size-11" />
              <div className="flex flex-col">
                <p className="text-start">백준 1051번, 양배추~ [진행중]</p>
                <p className="text-start text-[#505866]">
                  난이도 : 실버 2 언어 : C++
                </p>
              </div>

              <img src={nextArrow} className="w-2 h-3.5 absolute right-6" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
