import React from "react";

interface ButtonProps {
  className?: string;
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  color?: string;
}

const Button = ({ className, icon, label, onClick }: ButtonProps) => {
  return (
    <button
      className={`w-96 h-16 rounded-full font-bold text-[18px] py-2 px-4 cursor-pointer
        ${className}`}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default Button;
