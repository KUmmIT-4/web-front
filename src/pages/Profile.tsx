import Header from "@/components/header";

const Profile = () => {
  return (
    <div className="max-w-[540px] mx-auto">
      <Header noLogo={true} title={"내정보"} />
      <main className="mt-4 max-w-[540px] w-full">
        <div className="px-9 pt-5 pb-11 flex gap-8 border-b border-[var(--disabled)]">
          {/* <img /> */}
          <div className="size-25 bg-[var(--disabled)] rounded-[50%] mb-5"></div>
          <div className="flex flex-col py-4 gap-2 text-start">
            <span className="font-bold">harucoding 님</span>
            <span className="font-bold">1000점</span>
          </div>
        </div>
        <div className=" border-b border-[var(--disabled)] h-14 text-start">
          <span className="ml-4 font-medium h-full block leading-14">
            내정보 수정
          </span>
        </div>
        <div className=" border-b border-[var(--disabled)] h-14 text-start">
          <span className="ml-4 font-medium h-full block leading-14">
            로그아웃
          </span>
        </div>
      </main>
    </div>
  );
};

export default Profile;
