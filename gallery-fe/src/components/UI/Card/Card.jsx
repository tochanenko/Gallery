import classes from "./Card.module.scss";

export default function Card({ children, className, ...props }) {
  return <div className={`${classes.card} ${className}`} {...props}>
    {children}
  </div>
}