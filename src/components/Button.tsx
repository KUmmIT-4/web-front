import React from "react";

interface ButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  //   color?: string;
}

const Button = ({ icon, label, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default Button;
