import classes from "./Card.module.scss";
import { motion } from "motion/react";

export default function Card({ children, className, animateAppearance = false, ...props }) {

  console.log(animateAppearance);

  return animateAppearance ? <motion.div
    className={`${classes.card} ${className}`}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    {...props}
  >
    {children}
  </motion.div> : <div className={`${classes.card} ${className}`} {...props}>{children}</div>
}