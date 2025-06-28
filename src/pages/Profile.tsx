const Profile = () => {
  return (
    <div className="max-w-[540px] mx-auto">
      <header className="font-bold text-xl mt-4">내 정보</header>
      <main className="mt-4 max-w-[540px] w-full">
        <div className="px-4 py-5">
          {/* <img /> */}
          <div className="size-20 bg-[var(--disabled)] rounded-[50%] mb-5"></div>
          <p className="text-start font-bold underline">example.gmail.com</p>
        </div>
        <div className=" border-t h-14 text-start">
          <span className="ml-4 text-xl font-medium h-full block leading-14">
            마이페이지
          </span>
        </div>
        <div className=" border-t h-14 text-start">
          <span className="ml-4 text-xl font-medium h-full block leading-14">
            로그아웃
          </span>
        </div>
      </main>
    </div>
  );
};

export default Profile;
