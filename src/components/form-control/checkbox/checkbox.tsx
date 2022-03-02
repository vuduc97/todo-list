import clsx from "clsx";
import { FormControlProps } from "../../../types/common";
import classes from "./checkbox.module.scss";

type CheckboxProps = Omit<FormControlProps, "errorMessage"> &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  const containerStyle = clsx(classes["checkbox__container"], className);

  return (
    <label htmlFor={props.id} className={containerStyle}>
      <input type="checkbox" className={classes["checkbox__input"]} {...props} />
      {label && <span className={classes["checkbox__label"]}>{label}</span>}
    </label>
  );
}
