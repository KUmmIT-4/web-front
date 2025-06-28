import { fetchAPI } from "@/api/test";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<User>();

  interface User {
    userId: number;
    username: string;
    tier: string;
    level: number;
    language: string;
    rating: number; // score
    streak_days: number;
  }
  useEffect(() => {
    fetchAPI<undefined, User>("get", "/users/me")
      .then((res) => {
        setUserInfo(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const gotoEdit = () => {
    navigate("/profile/edit", {
      state: {
        name: userInfo?.username,
        tier: userInfo?.tier.toLowerCase(),
        level: String(userInfo?.level),
        language: userInfo?.language.toLowerCase(),
      },
    });
  };
  const logOut = () => {
    fetchAPI("post", "/users/logout", { body: {} })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div className="max-w-[540px] mx-auto">
      <Header noLogo={true} title={"내정보"} />
      <main className="mt-4 max-w-[540px] w-full">
        <div className="px-9 pt-5 pb-11 flex gap-8 border-b border-[var(--disabled)]">
          {/* <img /> */}
          <div className="size-25 bg-[var(--disabled)] rounded-[50%] mb-5"></div>
          <div className="flex flex-col py-4 gap-2 text-start">
            <span className="font-bold">{userInfo?.username} 님</span>
            <span className="font-bold">{userInfo?.rating}점</span>
          </div>
        </div>
        <div
          className=" border-b border-[var(--disabled)] h-14 text-start"
          onClick={gotoEdit}
        >
          <span className="ml-4 font-medium h-full block leading-14">
            내정보 수정
          </span>
        </div>
        <div
          className=" border-b border-[var(--disabled)] h-14 text-start"
          onClick={logOut}
        >
          <span className="ml-4 font-medium h-full block leading-14">
            로그아웃
          </span>
        </div>
      </main>
    </div>
  );
};

export default Profile;
