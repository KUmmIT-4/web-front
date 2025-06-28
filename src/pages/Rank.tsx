// import defaultProfile from "@/assets/images/default-profile.png";
import { useState } from "react";

import Header from "@/components/header";
import RankBall from "@/components/custom/RankBall";
import RankItem from "@/components/custom/RankItem";

const Rank = () => {
  const [totalPeriod, setTotalPeriod] = useState(false);
  return (
    <>
      {/* <header className="mt-4 font-bold text-xl">리더보드</header> */}
      <Header noLogo={true} title={"랭킹"} />
      <main className="mt-4 flex flex-col gap-4">
        <div className="px-4 h-75 relative">
          <RankBall
            rank={1}
            id={"james"}
            score={40000}
            className="absolute left-1/2 -translate-x-1/2"
          />
          <RankBall
            rank={2}
            id={"james"}
            score={40000}
            className="absolute left-1/5 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <RankBall
            rank={3}
            id={"james"}
            score={40000}
            className="absolute left-4/5 top-2/3 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="flex w-full h-12">
          <div
            className={`flex-1 leading-12 ${
              !totalPeriod && "border-b-2 border-[var(--primary)]"
            }`}
            onClick={() => {
              setTotalPeriod(false);
            }}
          >
            최근 7일
          </div>
          <div
            className={`flex-1 leading-12 ${
              totalPeriod && "border-b-2 border-[var(--primary)]"
            }`}
            onClick={() => {
              setTotalPeriod(true);
            }}
          >
            전체
          </div>
        </div>
        <div className="px-2">
          <RankItem rank={4} score={1000} id={"idididdid"} />
          <RankItem rank={5} score={800} id={"jdjdjddjd"} />
          <RankItem rank={6} score={400} id={"kdkdkdkd"} />
        </div>
      </main>
    </>
  );
};

export default Rank;
