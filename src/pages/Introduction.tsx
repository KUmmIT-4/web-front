// import React from "React";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const Introduction = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen gap-64 bg-slate-50">
      <title>Introduction</title>
      <div className="flex flex-col items-center pt-36">
        <h1 className="text-blue-500 text-5xl font-bold ">하루코딩</h1>
        <div className="text-gray-600 text-[17px] font-bold pt-6">
          <div>하루 한 문제, 코딩이 습관이</div>
          <div>되는 순간까지</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <Button
            className="bg-blue-200 text-slate-950"
            icon=""
            label="로그인"
            onClick={() => {
              navigate("/log");
            }}
          />
        </div>
        <div>
          <Button
            className="bg-blue-200 text-slate-950"
            icon=""
            label="회원가입"
            onClick={() => {
              navigate("/register");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
