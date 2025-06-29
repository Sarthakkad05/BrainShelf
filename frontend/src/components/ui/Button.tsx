import { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary"| "tertiary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  loading?: boolean
}

const variantStyle = {
  primary: "bg-[#5046e4] text-white",
  secondary: "bg-[#e0e7fe] text-[#3e38a7]",
  tertiary: "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white transition-colors duration-300 ease-in-out",
};

const sizeStyle = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-md",
  lg: "px-6 py-3 text-lg",
};

const defaultStyles = "rounded-lg flex items-center justify-center cursor-pointer ";

export const Button = ({
  variant,
  size,
  text,
  startIcon,
  endIcon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${variantStyle[variant]} ${defaultStyles} ${sizeStyle[size]}`}
    >
      {startIcon && <span>{startIcon}</span>}
      <span>{text}</span>
      {endIcon && <span>{endIcon}</span>}
    </button>
  );
};
