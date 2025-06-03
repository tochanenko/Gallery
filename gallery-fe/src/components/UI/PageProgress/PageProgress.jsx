import { AnimatePresence, motion } from "motion/react";
import classes from "./PageProgress.module.scss";
import { useDispatch, useSelector } from "react-redux";

export default function PageProgress() {
  const loading = useSelector(state => state.progress.loading);

  return <AnimatePresence>
    {loading && (
      <motion.div
        className={classes.progress}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={classes.progress__bar}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{
            scaleX: [0, 1, 1, 0],
            originX: [0, 0, 1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            times: [0, 0.49, 0.5, 1],
          }}
        />
      </motion.div>
    )}
  </AnimatePresence>
}
