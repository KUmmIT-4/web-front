// import defaultProfile from "@/assets/images/default-profile.png";
import { useEffect, useState } from "react";

import Header from "@/components/header";
import RankBall from "@/components/custom/RankBall";
import RankItem from "@/components/custom/RankItem";
import { fetchAPI } from "@/api/test";

const Rank = () => {
  const PERPAGE = 5; // 페이지 당 호출 리더보드 수

  const [page, setPage] = useState(0);
  const [userRanks, setUserRanks] = useState<User[]>([]);
  const [highRankers, setHighRankers] = useState<User[]>([]);
  const [lowRankers, setLowRankers] = useState<User[]>([]);

  interface User {
    username: "leet_hacker";
    rating: 5200;
  }
  interface LeaderBoardRequest {
    pageNo: number;
    perPage: number;
  }
  interface LeaderBoardResponse {
    users: User[];
    hasNext: boolean;
  }

  useEffect(() => {}, []);

  useEffect(() => {
    fetchAPI<LeaderBoardRequest, LeaderBoardResponse>(
      "post",
      "/users/leaderboard",
      {
        body: { pageNo: page, perPage: PERPAGE },
      }
    )
      .then((res) => {
        if (res.hasNext) {
          setPage((prev) => prev + 1);
        }
        setHighRankers(res.users.slice(0, 3));
        if (res.users.length > 3) {
          setLowRankers(res.users.slice(3));
        }
        // setUserRanks((prev) => [...prev, ...res.users]);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  const renderHighRankers = () =>
    highRankers.map((highRanker, idx) => (
      <RankBall
        rank={idx + 1}
        id={highRanker.username}
        score={highRanker.rating}
        className="absolute left-1/2 -translate-x-1/2"
      />
    ));

  const renderLowRankers = () =>
    lowRankers.map((lowRanker, idx) => (
      <RankItem
        rank={idx + 4}
        score={lowRanker.rating}
        id={lowRanker.username}
      />
    ));

  return (
    <>
      {/* <header className="mt-4 font-bold text-xl">리더보드</header> */}
      <Header noLogo={true} title={"랭킹"} />
      <main className="mt-4">
        <div className="px-4 h-75 relative">
          {renderHighRankers()}
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

        <div className="flex w-full px-2 text-[17px] font-medium">
          전체 순위
        </div>
        <div className="px-2">
          {renderLowRankers()}
          <RankItem rank={4} score={1000} id={"idididdid"} />
          <RankItem rank={5} score={800} id={"jdjdjddjd"} />
          <RankItem rank={6} score={400} id={"kdkdkdkd"} />
        </div>
      </main>
    </>
  );
};

export default Rank;
