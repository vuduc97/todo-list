import clsx from "clsx";
import classes from "./button.module.scss";

export enum ButtonColor {
  Default = "",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
}

type ButtonProps = {
  color?: ButtonColor;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function Button({ color = ButtonColor.Default, className, ...props }: ButtonProps) {
  const buttonStyle = clsx({ [classes["button"]]: true, [classes[color]]: !!color }, className);

  return <button className={buttonStyle} {...props} />;
}
