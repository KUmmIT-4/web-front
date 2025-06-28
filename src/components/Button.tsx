import React from "react";

interface ButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  color?: string;
  className?: string;
}

const Button = ({ icon, label, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className}>
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default Button;
