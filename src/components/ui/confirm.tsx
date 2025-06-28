// import React from 'react'
import Button from "../Button";
import { useNavigate } from "react-router-dom";

interface ConfirmProps {
  onClose: () => void;
}

const confirm = ({ onClose }: ConfirmProps) => {
  let navigate = useNavigate();
  const onClick = () => {
    navigate("/home");
  };
  return (
    <div
      className="fixed inset-0 flex items-center
     justify-center bg-black/50
     "
    >
      <div
        className="w-72 h-56 flex flex-col items-center justify-center 
      gap-8 bg-slate-50 pt-24 pb-16 pl-6 pr-6 rounded-[4vw]"
      >
        <div className="flex flex-col w-full items-center justify-center gap-2">
          <div className="font-bold">회원가입 완료!</div>
          <div className="w-44 whitespace-normal">
            홈으로 이동하여 서비스를 이용해주세요!
          </div>
        </div>
        <Button
          className="bg-blue-500 w-full text-slate-50"
          label="홈으로"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default confirm;
