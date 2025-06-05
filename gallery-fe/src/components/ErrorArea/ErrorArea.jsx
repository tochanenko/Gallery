import { useDispatch, useSelector } from "react-redux";

import classes from "./ErrorArea.module.scss";
import { errorActions } from "../../store/error";

import { AnimatePresence, motion } from "motion/react";

// This component is currently not used
// Might be useful in the future to track all errors in the project

export default function ErrorArea() {
  const errors = useSelector(store => store.error.errors);

  return <div className={classes.error_area}>
    <AnimatePresence>
      {errors.map(error => <ErrorChip key={error.id} error={error} />)}
    </AnimatePresence>
  </div>;
}

function ErrorChip(error) {
  const dispatch = useDispatch();

  function handleRemoveError() {
    dispatch(errorActions.removeError(error.error.id));
  }

  return <motion.div
    className={classes.error_area__chip}
    initial={{ opacity: 0, scale: 0.9, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    <span className={classes.error_area__chip__dismiss} onClick={handleRemoveError}>x</span>
    <p><b>An error occurred!</b></p>
    <p>{error.error.message}</p>
  </motion.div>
}