import type { ButtonHTMLAttributes } from "react";
import { appendClass, buttonBase, buttonSizes, buttonVariants } from "@/styles/classes";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  block?: boolean;
}

export function Button({ variant = "primary", size = "md", block, className, ...props }: ButtonProps) {
  return (
    <button
      className={appendClass(buttonBase, buttonVariants[variant], buttonSizes[size], block && "w-full", className)}
      {...props}
    />
  );
}
