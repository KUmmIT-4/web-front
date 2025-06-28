import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/header";
import SelectItems from "@/components/constants/SelectItems";
import pen from "@/assets/images/pen.png";
import timer from "@/assets/images/timer.png";
import trophy from "@/assets/images/trophy.png";
import codeIcon from "@/assets/images/codeIcon.png";
import nextArrow from "@/assets/images/next-arrow.png";
import { fetchAPI } from "@/api/test";
import Button from "@/components/Button";

const TIEROPTIONS = [
  { label: "브론즈", value: "브론즈" },
  { label: "실버", value: "실버" },
  { label: "골드", value: "골드" },
  { label: "그 이상", value: "그 이상" },
];
const LABELOPTIONS = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];
const LANGUAGEOPTIONS = [
  { label: "C", value: "C" },
  { label: "C++", value: "C++" },
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "JavaScript", value: "JavaScript" },
];

const Home = () => {
  const navigate = useNavigate();

  const [conti, setConti] = useState(false); // 풀고 있는 문제 유무
  const [fireDays, setFireDays] = useState(0); // 연속 성공 날짜
  const [todayChallenge, setTodayChallenge] = useState<Attempt[]>([]);
  const [page, setPage] = useState(0);
  const [tier, setTier] = useState("");
  const [level, setLevel] = useState(1);
  const [language, setLanguage] = useState("c");

  interface UserResponseType {
    streak_days: number;
  }
  interface Attempt {
    attempt_id: number;
    problem_id: number;
    title: string;
    status: string; // 가능한 status 값 명시
    problemTier: string;
    problemLevel: number;
  }
  interface AttemptListResponse {
    attempts: Attempt[];
    hasNext: boolean;
  }

  useEffect(() => {
    // 유저 정보 가져오기
    fetchAPI<undefined, UserResponseType>("get", "/users/me")
      .then((res) => {
        console.log(res);
        setFireDays(res.streak_days);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  useEffect(() => {
    // 오늘의 도전기록 가져오기
    const today = new Date().toISOString().slice(0, 19);
    console.log(today);
    fetchAPI<undefined, AttemptListResponse>("get", "/attempts/me", {
      params: { date: today },
    })
      .then((res) => {
        if (res.hasNext) {
          setPage((prev) => prev + 1);
        }
        setTodayChallenge((prev) => [...prev, ...res.attempts]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  const gotoRank = () => {
    navigate("/rank");
  };
  const gotoQuiz = () => {
    navigate("/quiz", {
      state: {
        tier,
        level,
        language,
      },
    });
  };

  const renderChallengeList = () => {};

  return (
    <>
      <Header />
      <main className="w-full px-4 mx-auto">
        <div>
          <p className="font-bold text-2xl text-black pt-5.5 pb-7">
            {`연속도전 ${fireDays}일차`}
          </p>
          <div className="flex gap-7 mb-3">
            <SelectItems
              placeholder="등급"
              options={TIEROPTIONS}
              onValueChange={(val) => {
                setTier(val);
              }}
            />
            <SelectItems
              placeholder="라벨"
              options={LABELOPTIONS}
              onValueChange={(val) => {
                setLevel(Number(val));
              }}
            />
          </div>
          <div className="mb-3.5 flex">
            <SelectItems
              placeholder="언어"
              options={LANGUAGEOPTIONS}
              onValueChange={(val) => {
                setLanguage(val);
              }}
            />
          </div>
          <div className="flex flex-col gap-3.5 mb-7">
            <Button
              icon={<img src={pen} className="size-4.5" />}
              label="코딩 문제풀기"
              className="bg-[var(--primary)] w-full flex h-14 justify-center items-center gap-2 rounded-2xl text-base text-white"
              onClick={gotoQuiz}
            />
            <Button
              icon={<img src={timer} className="size-4.5" />}
              label="복습하기"
              className="bg-[var(--disabled)] w-full flex h-14 justify-center items-center gap-2 rounded-2xl text-base"
            />
            <Button
              icon={<img src={trophy} className="size-4.5" />}
              label="순위보기"
              onClick={gotoRank}
              className="bg-[var(--disabled)] w-full flex h-14 justify-center items-center gap-2 rounded-2xl text-base"
            />
          </div>
        </div>
        <div>
          <p className="mb-4 font-bold text-2xl text-start">오늘의 도전기록</p>
          <div className="flex flex-col gap-3.5">
            {renderChallengeList()}
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
