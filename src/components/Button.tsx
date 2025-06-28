import React from "react";
import { cn } from "@/lib/utils";

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
      className={cn(
        "w-full h-16 font-bold text-[18px] py-2 px-4 cursor-pointer rounded-full",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text-bold">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default Button;
