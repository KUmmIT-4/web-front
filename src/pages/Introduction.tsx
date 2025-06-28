// import React from "React";
import Button from "@/components/Button";

const Introduction = () => {
  return (
    <div className="flex flex-col gap-64">
      <div className="flex flex-col items-center pt-36">
        <h1 className="text-blue-500 text-5xl font-bold ">하루코딩</h1>
        <div className="text-gray-600 text-[17px] font-bold pt-6">
          <div>하루 한 문제, 코딩이 습관이</div>
          <div>되는 순간까지</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Button className="bg-blue-200" icon="" label="로그인" />
        </div>
        <div>
          <Button className="bg-blue-200" icon="" label="회원가입" />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
