import classes from "./Card.module.scss";
import { motion } from "motion/react";

export default function Card({
  title = undefined,
  children,
  noPadding = false,
  className = "",
  contentClassName = "",
  animateAppearance = false,
  initial = {},
  animate = {},
  transition = {},
  ...props
}) {
  const cardContent = <>
    {title && <div className={`${classes.card__title} ${noPadding ? classes.noPadding : ""}`}>{title}</div>}
    <div className={`${classes.card__content} ${noPadding ? classes.nopadding : ""} ${contentClassName}`}>{children}</div>
  </>;

  return animateAppearance ? <motion.div
    className={`${classes.card} ${className}`}
    initial={{ ...{ opacity: 0, scale: 0.9 }, ...initial }}
    animate={{ ...{ opacity: 1, scale: 1 }, ...animate }}
    transition={{ ...{ duration: 0.3, ease: "easeInOut" }, ...transition }}
    {...props}
  >
    {cardContent}
  </motion.div> : <div className={`${classes.card} ${className}`} {...props}>{cardContent}</div>
}