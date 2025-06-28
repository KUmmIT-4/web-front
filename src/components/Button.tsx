import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  className?: string;
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  smallRounded?: boolean;
}

const Button = ({ className, icon, label, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        "w-full h-16 font-bold text-[18px] py-2 px-4 cursor-pointer rounded-full",
        className
      )}
      onClick={onClick}
    >
      <span className="text-bold">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default Button;
