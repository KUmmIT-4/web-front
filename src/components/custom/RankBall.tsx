interface RankProps {
  className?: string;
  rank: number;
  id: string;
  score: number;
}

function RankBall({ className, rank, id, score }: RankProps) {
  const RANKDICTIONARY: Record<number, { rank: string; color: string }> = {
    1: { rank: "1st", color: "#FFCA3F" },
    2: { rank: "2nd", color: "#C3C3C4" },
    3: { rank: "3rd", color: "#CD864F" },
  };
  return (
    <div className={`flex flex-col w-25 items-center ${className}`}>
      <div
        className="bg-[#FFCA3F] rounded-[50%] size-25 text-white flex justify-center items-center"
        style={{ backgroundColor: RANKDICTIONARY[rank].color }}
      >
        <span className="font-bold text-3xl">{RANKDICTIONARY[rank].rank}</span>
      </div>
      <span className="font-medium text-black mb-2">harucoding</span>
      <span className="bg-[var(--disabled)] rounded-[10px] w-20 text-xs w-auto px-2 py-1">
        40000점
      </span>
    </div>
  );
}

export default RankBall;
