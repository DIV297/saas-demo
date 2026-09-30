import { ChevronDown } from "lucide-react";
import type { ReactNode, SelectHTMLAttributes } from "react";
import { appendClass } from "@/styles/classes";
import { selectFieldStyles as s } from "./styles";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  label?: string;
  icon?: ReactNode;
}

/** Native <select> styled like TextField (keyboard + screen-reader support for free). */
export function SelectField({ options, label, icon, id, className, ...props }: SelectFieldProps) {
  const control = (
    <span className={appendClass(s.wrapper, !label && className)}>
      {icon && <span className={s.icon}>{icon}</span>}
      <select id={id} className={appendClass(s.select, icon && s.selectWithIcon)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className={s.chevron} aria-hidden />
    </span>
  );

  if (!label) return control;

  return (
    <label htmlFor={id} className={appendClass(s.field, className)}>
      <span className={s.label}>{label}</span>
      {control}
    </label>
  );
}
