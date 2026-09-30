import { appendClass } from "@/styles/classes";
import { Dropdown, type DropdownProps } from "./Dropdown";
import { selectFieldStyles as s } from "./styles";

interface SelectFieldProps<T extends string> extends Omit<DropdownProps<T>, "variant" | "id"> {
  id: string;
}

/** Labelled form select: the brand Dropdown in its "field" look, laid out like TextField. */
export function SelectField<T extends string>({ id, label, className, ...props }: SelectFieldProps<T>) {
  return (
    <div className={appendClass(s.field, className)}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <Dropdown id={id} label={label} variant="field" {...props} />
    </div>
  );
}
