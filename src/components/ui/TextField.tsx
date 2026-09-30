import type { InputHTMLAttributes, ReactNode } from "react";
import { appendClass } from "@/styles/classes";
import { textFieldStyles as s } from "./styles";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
}

export function TextField({ label, icon, id, className, ...props }: TextFieldProps) {
  return (
    <label className={appendClass(s.wrapper, className)} htmlFor={id}>
      {label && <span className={s.label}>{label}</span>}
      <span className={s.control}>
        {icon && <span className={s.icon}>{icon}</span>}
        <input id={id} className={appendClass(s.input, icon && s.inputWithIcon)} {...props} />
      </span>
    </label>
  );
}
