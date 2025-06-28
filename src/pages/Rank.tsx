// import defaultProfile from "@/assets/images/default-profile.png";

const Rank = () => {
  return (
    <>
      <header className="mt-4 font-bold text-xl">리더보드</header>
      <main className="px-4 mt-4 flex flex-col gap-4">
        <div className="flex gap-4">
          {/* <img src={defaultProfile} className="size-10" /> */}
          <div className="rounded-[50%] size-13 bg-[var(--disabled)]"></div>
          <div className="flex flex-col justify-center">
            <p className="text-start font-bold">1. 멍멍멍</p>
            <p className="text-start text-[#505866]">1000 점</p>
          </div>
        </div>

        <div className="flex gap-4">
          {/* <img src={defaultProfile} className="size-10" /> */}
          <div className="rounded-[50%] size-13 bg-[var(--disabled)]"></div>
          <div className="flex flex-col justify-center">
            <p className="text-start font-bold">2. 뭉뭉뭉</p>
            <p className="text-start text-[#505866]">985 점</p>
          </div>
        </div>

        <div className="flex gap-4">
          {/* <img src={defaultProfile} className="size-10" /> */}
          <div className="rounded-[50%] size-13 bg-[var(--disabled)]"></div>
          <div className="flex flex-col justify-center">
            <p className="text-start font-bold">3. 왕왕왕</p>
            <p className="text-start text-[#505866]">873 점</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Rank;
