import { useRef } from "react";
import { PHOTO_URL } from "../../lib/constants";
import Button from "../UI/Button/Button";
import classes from "./PhotoPreview.module.scss";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

export default function PhotoPreview({ photo, visible = false, onClose }) {
  const { scrollY } = useScroll();
  const isFirstRender = useRef(true);

  useMotionValueEvent(scrollY, "change", () => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onClose();
  });

  if (!photo) return null;

  return <AnimatePresence>
    {visible && <motion.div
      className={classes.photo_preview}
      onClick={onClose}
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
      exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      transition={{ duration: 0.1 }}
    >
      <motion.img
        className={classes.photo_preview__image}
        src={`${PHOTO_URL}${photo.url}`}
        alt={photo.title}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.1 }}
      />

      <Button
        className={classes.photo_preview__close}
        onClick={onClose}
        aria-label="Close">&times;</Button>
    </motion.div>}
  </AnimatePresence>
}
