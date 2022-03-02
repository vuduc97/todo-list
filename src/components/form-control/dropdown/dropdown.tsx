import clsx from "clsx";
import { FormControlProps, KeyValue } from "../../../types/common";
import classes from "../form-control.module.scss";

type OptionValue = string | number | readonly string[] | undefined;

type DropdownProps = FormControlProps & { options: KeyValue<OptionValue, string>[] } & React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >;

export function Dropdown({ label, errorMessage, options, className, ...props }: DropdownProps) {
  const containerStyle = clsx(classes["form-control__container"], className);
  const inputStyle = clsx({
    [classes["form-control__input"]]: true,
    [classes["form-control__input--invalid"]]: !!errorMessage,
  });

  return (
    <div className={containerStyle}>
      {label && <label className={classes["form-control__label"]}>{label}</label>}
      <select className={inputStyle} {...props}>
        {options.map((option) => (
          <option key={option.key?.toString()} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
      {errorMessage && <span className={classes["form-control__helptext"]}>{errorMessage}</span>}
    </div>
  );
}
