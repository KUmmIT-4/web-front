import React from "react";

interface ButtonProps {
  className?: string;
  icon?: React.ReactNode;
  label: string;
  // onClick?: () => any;
  onClick?: () => void;
  // onClick?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const Button = ({ className, icon, label, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={`w-96 h-16 rounded-full font-bold text-[18px] py-2 px-4 cursor-pointer
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default Button;
