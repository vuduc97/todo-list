import clsx from "clsx";
import { FormControlProps } from "../../../types/common";
import classes from "../form-control.module.scss";

type TextareaProps = FormControlProps &
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export function Textarea({ label, errorMessage, rows = 8, className, ...props }: TextareaProps) {
  const containerStyle = clsx(classes["form-control__container"], className);
  const inputStyle = clsx({
    [classes["form-control__input"]]: true,
    [classes["form-control__input--invalid"]]: !!errorMessage,
  });

  return (
    <div className={containerStyle}>
      {label && <label className={classes["form-control__label"]}>{label}</label>}
      <textarea rows={rows} className={inputStyle} {...props} />
      {errorMessage && <span className={classes["form-control__helptext"]}>{errorMessage}</span>}
    </div>
  );
}
