import { PHOTO_URL } from "../../lib/constants";
import classes from "./PhotoPreview.module.scss";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

export default function PhotoPreview({ photo, visible = false, onClose }) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={classes.photo_preview__backdrop}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.img
          src={`${PHOTO_URL}${photo.url}`}
          alt={photo.title}
          layoutId={`photo-${photo.id}`}
          className={classes.photo__preview__image}
          style={{ aspectRatio: photo.aspectRatio }}
        />
        <button
        onClick={onClose}
        aria-label="Close">&times;</button>
      </motion.div>
    </AnimatePresence>
  )
}





/*


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


  */