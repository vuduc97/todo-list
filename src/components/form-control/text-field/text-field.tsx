import clsx from "clsx";
import { FormControlProps } from "../../../types/common";
import classes from "../form-control.module.scss";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type TextFieldProps = FormControlProps & InputProps;

export function TextField({ errorMessage, label, className, ...props }: TextFieldProps) {
  const containerStyle = clsx(classes["form-control__container"], className);
  const inputStyle = clsx({
    [classes["form-control__input"]]: true,
    [classes["form-control__input--invalid"]]: !!errorMessage,
  });

  return (
    <div className={containerStyle}>
      {label && <label className={classes["form-control__label"]}>{label}</label>}
      <input className={inputStyle} {...props} />
      {errorMessage && <span className={classes["form-control__helptext"]}>{errorMessage}</span>}
    </div>
  );
}
