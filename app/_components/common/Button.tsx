import { ButtonHTMLAttributes, LegacyRef } from "react";
import { classNames } from "@/_utils/helpers";

const buttonVariants = {
  primary: "bg-primary-400  text-white  hover:bg-primary-500",
  disabled: "bg-gray-100 text-gray-500 cursor-default",
};

export type ButtonProps = Partial<ButtonHTMLAttributes<HTMLElement>> & {
  text: string | JSX.Element;
  onClick?: (e: MouseEvent) => void;
  variant?: "primary" | "disabled";
};

const Button = ({
  text,
  onClick,
  variant,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        `inline-flex items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-semibold shadow-sm justify-center focus:outline-none ${
          buttonVariants[disabled ? "disabled" : variant || "primary"]
        }`,
        className
      )}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
