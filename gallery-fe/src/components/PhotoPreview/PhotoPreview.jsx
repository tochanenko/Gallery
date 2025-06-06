import { PHOTO_URL } from "../../lib/constants";
import classes from "./PhotoPreview.module.scss";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

export default function PhotoPreview({ photo, visible = false, onClose }) {
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
      onClose();
  })

  return visible ? <motion.div
    className={classes.photo_preview}
    onClick={onClose}
  >
    <motion.img
      src={`${PHOTO_URL}${photo.url}`}
      alt={photo.title}
      onClick={onClose}
      layoutId={`photo-${photo.id}`}
    />
  </motion.div> : undefined;
}