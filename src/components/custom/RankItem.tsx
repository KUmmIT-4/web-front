interface RankItemProps {
  rank: number;
  id: string;
  score: number;
}

function RankItem({ rank, id, score }: RankItemProps) {
  return (
    <div className="h-20 flex items-center relative font-medium">
      <span className="text-[17px] mr-2.5">{rank}</span>
      <div className="bg-[var(--disabled)] size-11 rounded-[50%] mr-3"></div>
      <span>{id}</span>
      <span className="absolute right-12">{score}점</span>
    </div>
  );
}

export default RankItem;
