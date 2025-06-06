import { useState } from "react";
import Card from "../../components/UI/Card/Card";
import Skeleton from "../../components/UI/Skelelton/Skeleton";
import { PHOTO_URL } from "../../lib/constants";
import classes from "./Photo.module.scss";
import { motion } from "motion/react";

export default function PhotoBlock({ photo, onSetPhotoPreview }) {
  const [overflowVisible, setOverflowVisible] = useState(false);

  function handleOpenPreview() {
    setOverflowVisible(true);
    onSetPhotoPreview(true)
  }

  return <motion.div layout>
    <Card
      className={classes.photo_block}
      style={{ overflow: overflowVisible ? "visible" : "hidden" }}
      animateAppearance
    >
      {photo === null ? <Skeleton
        className={classes["photo_block--skeleton"]}
        initialBackground="var(--photo-skeleton-background)"
        tintedBackground="var(--photo-skeleton-background-tinted)"
      /> : <motion.div
        className={classes.photo_block__image}
        style={{ aspectRatio: photo.aspectRatio }}
        layoutId={`photo-${photo.id}`}
        onLayoutAnimationComplete={() => setOverflowVisible(false)}
      >
        <motion.img
          src={`${PHOTO_URL}${photo.url}`}
          alt={photo.title}
          onClick={handleOpenPreview}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>}
    </Card>
  </motion.div>
}