import classes from "./Button.module.scss";

export default function Button({ children, inline = false, className = "", ...props }) {
  return <button
    className={`${classes.button} ${inline ? classes["button--inline"] : ""} ${className}`}
    {...props}
  >{children}</button>
}