import { PHOTO_URL } from "../../lib/constants";
import Button from "../UI/Button/Button";
import classes from "./PhotoPreview.module.scss";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

export default function PhotoPreview({ photo, visible = false, onClose }) {
  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={classes.photo_preview}
        onClick={onClose}
        initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        animate={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
        exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
        transition={{ duration: 0.1 }}
      >
        <motion.div
          className={classes.photo_preview__image}
          style={{ aspectRatio: photo.aspectRatio }}
          layoutId={`photo-${photo.id}`}
        >
          <motion.img
            src={`${PHOTO_URL}${photo.url}`}
            alt={photo.title}
          />
        </motion.div>

        <Button
          className={classes.photo_preview__close}
          onClick={onClose}
          aria-label="Close">&times;</Button>
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