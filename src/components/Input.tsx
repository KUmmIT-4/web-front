import React, { useState } from "react";
import EyePw from "@/assets/images/eyePw.svg";

interface InputProps {
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ className, onChange }: InputProps) => {
  //password type 변경용 state
  const [passwordType, setPasswordType] = useState({
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
    visible: false,
  });

  //password type 변경하는 함수
  const handlePasswordType = (e: any) => {
    setPasswordType((prev) => {
      if (!passwordType.visible) {
        return { ...prev, type: "text", visible: true };
      }
      return { ...prev, type: "password", visible: false };
    });
  };
  return (
    <div
      className={`w-96 relative flex items-center rounded-lg border border-solid z-0 ${className}`}
    >
      <input
        className="h-14 border-0 border-slate-500 focus:outline-none
        text-slate-500"
        placeholder="비밀번호를 입력해주세요."
        onChange={onChange}
        type={passwordType.type}
      />
      <span
        className="absolute right-4 cursor-pointer"
        onClick={handlePasswordType}
      >
        <img src={EyePw} className="w-12 h-12" />
        {/* {passwordType.visible ? <span>숨기기</span> : <span>보이기</span>} */}
      </span>
    </div>
  );
};

export default Input;
